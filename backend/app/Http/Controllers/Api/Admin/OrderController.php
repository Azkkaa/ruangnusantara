<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\UpdateStatusOrderRequest;
use App\Models\Order;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function index ()
    {
        try {
            $orders = Order::with('orderItem.menu')->get();

            $now = Carbon::now();
            $reveToday = Order::where('status', 'completed')
                ->whereDate('created_at', $now->today())
                ->sum('total_price');
            $reveWeek = Order::where('status', 'completed')
                ->whereBetween('created_at', [
                    $now->copy()->startOfWeek(),
                    $now->copy()->endOfWeek()
                ])
                ->sum('total_price');
            $reveMonth = Order::where('status', 'completed')
                ->whereBetween('created_at', [
                    $now->copy()->startOfMonth(),
                    $now->copy()->endOfMonth()
                ])
                ->sum('total_price');

            return response()->json([
                'message' => 'getting order data',
                'resources' => $orders,
                'revenue' => [
                    'today' => $reveToday,
                    'week' => $reveWeek,
                    'month' => $reveMonth,
                    'label' => [
                        'month_name' => $now->format('F'),
                        'today_date' => $now->format('d M Y')
                    ]
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus (UpdateStatusOrderRequest $request, $id)
    {
        try {
            $order = Order::findOrFail($id);

            $order->update([
                'status' => $request->status
            ]);

            return response()->json([
                'success' => true,
                'message' => "Order #{$id} status updated to {$request->status}",
                'order' => $order
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update status!',
                'Error' => $e->getMessage()
            ], 500);
        }
    }
}
