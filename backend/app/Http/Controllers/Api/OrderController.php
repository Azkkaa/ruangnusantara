<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\OutOfStockException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderStoreRequest;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;

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

                return $userOrder;
            });

            // Response
            return response()->json([
                'success' => true,
                'message' => 'Berhasil Menambahkan Pesanan!',
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
}
