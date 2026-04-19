<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderStoreRequest;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store (OrderStoreRequest $request)
    {
        try {
            $userOrder = DB::transaction(function () use ($request) {
                // Service

                // this code prevent hacker from manipulate the price
                // rather than we use data that client sent
                // we validate the data is right in here using whereIn get
                $user = $request->user();
                $itemids = collect($request->items)->pluck('id')->toArray();
                $items = Menu::whereIn('id', $itemids)->get()->keyBy('id');

                $totalPrice = 0;
                $orderItemsCreation = [];
                foreach ($request->items as $requestItem) {
                    $menu = $items[$requestItem['id']];
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
                'message' => 'Successfully creating order!',
                'order' => $userOrder
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'response' => [
                    'message' => $e->getMessage(),
                    'line' => $e->getLine()
                ]
            ], 500);
        }
    }
}
