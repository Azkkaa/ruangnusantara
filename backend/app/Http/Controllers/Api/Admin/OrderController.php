<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderController extends Controller
{
    public function index ()
    {
        $orders = Order::with('orderItem.menu')->get();

        return response()->json([
            'message' => 'getting order data',
            'resources' => $orders
        ], 200);
    }

    public function show ()
    {

    }
}
