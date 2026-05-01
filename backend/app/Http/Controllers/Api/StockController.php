<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StockUpdateRequest;
use App\Models\Menu;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class StockController extends Controller
{
    public function updateStock (StockUpdateRequest $request, $id)
    {
        try {
            $menuItem = Menu::findOrFail($id);
            $isAvaible = true;

            if ($request->stock === 0) {
                $isAvaible = false;
            }

            $menuItem->update([
                'stock' => $request->stock,
                'is_avaible' => $isAvaible
            ]);

            return response()->json([
                'message' => "Data stok {$menuItem->name} berhasil diperbarui!",
                'success' => true,
                'menu_item' => $menuItem
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Menu item tidak ditemukan!'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
