<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index ()
    {
        try {
            $lowStockItems = Menu::where('stock', '<', 10)
                ->orderBy('stock', 'asc')
                ->get(['id', 'name', 'stock', 'is_avaible']);

            $stats = [
                'totalMenus' => Menu::count(),
                'lowStockCount' => Menu::whereBetween('stock', [1, 9])->count(),
                'outOfStockCount' => Menu::where('stock', '<=', 0)->count(),
                'activeOrdersCount' => Order::whereDate('created_at', today())
                            ->whereIn('status', ['pending', 'process'])
                            ->count(),
            ];

            // For dashboard income chart
            // $salesChart = Order::where('status', 'success')
            //     ->where('created_at', '>=', now()->subDays(7))
            //     ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_price) as total'))
            //     ->groupBy('date')
            //     ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data dashboard berhasil dimuat',
                'stats' => $stats,
                'low_stock_items' => $lowStockItems
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memuat data dashboard',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
