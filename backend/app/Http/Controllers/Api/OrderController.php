<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\OutOfStockException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderStoreRequest;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Midtrans\Config;
use Midtrans\Snap;
use Vinkla\Hashids\Facades\Hashids;

class OrderController extends Controller
{
    public function store (OrderStoreRequest $request)
    {
        try {
            $userOrder = DB::transaction(function () use ($request) {
                $user = $request->user();
                $itemids = collect($request->items)->pluck('id')->toArray();
                $items = Menu::whereIn('id', $itemids)->lockForUpdate()->get()->keyBy('id');

                $totalPrice = 0;
                $orderItemsCreation = [];
                foreach ($request->items as $requestItem) {
                    $menu = $items[$requestItem['id']];

                    // 1. Stock validation
                    if ($menu->stock < $requestItem['quantity']) {
                        throw new OutOfStockException("Maaf, stok {$menu->name} tidak mencukupi (Tersisa: {$menu->stock}).");
                    }

                    $newStock = $menu->stock - $requestItem['quantity'];
                    $menu->update([
                        'stock' => $newStock,
                        'is_avaible' => $newStock > 0
                    ]);

                    $subtotal = $menu->price * $requestItem['quantity'];
                    $totalPrice += $subtotal;

                    $orderItemsCreation[] = [
                        'menu_id' => $menu->id,
                        'price' => $menu->price,
                        'quantity' => $requestItem['quantity'],
                        'subtotal' => $subtotal
                    ];
                }

                $userOrder = $user->order()->create([
                    'customer_name' => $request->customerName,
                    'phone' => $request->phone,
                    'notes' => $request->notes,
                    'total_price' => $totalPrice,
                    'status' => 'pending'
                ]);

                $userOrder->orderItem()->createMany($orderItemsCreation);

                Config::$serverKey = config('services.midtrans.serverKey');
                Config::$isProduction = config('services.midtrans.isProduction');
                Config::$isSanitized = config('services.midtrans.isSanitize');
                Config::$is3ds = config('services.midtrans.is3Ds');

                $hashOrderId = Hashids::encode($userOrder->id);

                $params = [
                    'transaction_details' => [
                        'order_id' => $hashOrderId,
                        'gross_amount' => (int)$totalPrice,
                    ],
                    'customer_details' => [
                        'first_name' => $request->customerName,
                        'phone' => $request->phone
                    ],
                    'callbacks' => [
                        'finish' => null
                    ]
                ];

                $snapToken = Snap::getSnapToken($params);
                $userOrder->update(['snap_token' => $snapToken]);

                return $userOrder;
            });

            // Response
            return response()->json([
                'success' => true,
                'message' => 'Berhasil Menambahkan Pesanan! Mohon selesaikan pembayaran!',
                'order' => $userOrder
            ]);
        }  catch (OutOfStockException $e) {
            return $e;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Internal Server Error!",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function notification (Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        $orderId = $payload['order_id'];
        $statusCode = $payload['status_code'];
        $grossAmount = $payload['gross_amount'];
        $serverKey = config('services.midtrans.serverKey');

        $signatureKey = hash("sha512", $orderId . $statusCode . $grossAmount . $serverKey);

        if ($signatureKey != $payload['signature_key']) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $decodeOrderId = Hashids::decode($orderId);

        if (empty($decodeOrderId)) {
            return response()->json(['message' => 'Invalid Order ID format'], 400);
        }

        $orderId = $decodeOrderId[0];

        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $transactionStatus = $payload['transaction_status'];
        $fraudStatus = $payload['fraud_status'] ?? '';

        DB::beginTransaction();
        try {
            if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
                if ($fraudStatus == 'challenge') {
                    $order->update(['status' => 'held']);
                } else {
                    $order->update(['status' => 'completed']);
                }
            } else if ($transactionStatus == 'deny') {
                $order->update(['status' => 'deny']);

                // Rollback stock logic
                foreach ($order->orderItem as $item) {
                    $menu = $item->menu;
                    if ($menu) {
                        $menu->update([
                            'stock' => $menu->stock + $item->quantity,
                            'is_avaible' => true
                        ]);
                    }
                }
            } else if ($transactionStatus == 'cancel' || $transactionStatus == 'expire') {
                $order->update(['status' => 'cancel']);

                // Rollback stock logic
                foreach ($order->orderItem as $item) {
                    $menu = $item->menu;
                    if ($menu) {
                        $menu->update([
                            'stock' => $menu->stock + $item->quantity,
                            'is_avaible' => true
                        ]);
                    }
                }
            } else if ($transactionStatus == 'pending') {
                $order->update(['status' => 'pending']);
            }

            DB::commit();

            return response()->json(['message' => 'Notification handled successfully'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
