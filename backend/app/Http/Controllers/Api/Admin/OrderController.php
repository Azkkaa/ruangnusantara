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
            $orders = Order::with('orderItem.menu')
                ->whereIn('status', ['pending', 'process'])
                ->get();

            $orderStatus = Order::pluck('status');

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
                'total_orders' => [
                    'total' => $orderStatus->count(),
                    'pending' => $orderStatus->countBy()->get('pending', 0),
                    'process' => $orderStatus->countBy()->get('process', 0),
                    'completed' => $orderStatus->countBy()->get('completed', 0),
                ],
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
                'success' => false,
                'message' => 'Internal Server Error!!',
                'error' => $e->getMessage()
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
                'message' => 'Internal Server Error!!',
                'Error' => $e->getMessage()
            ], 500);
        }
    }

    public function statusOrder ()
    {
        try {
            $allStatus = Order::pluck('status')->countBy();

            return response()->json([
                'pending' => $allStatus->get('pending', 0),
                'completed' => $allStatus->get('completed', 0),
                'process' => $allStatus->get('process', 0),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error!!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show ()
    {

    }
}
