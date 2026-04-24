<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index (Request $request)
    {
        try {
            $userFavoriteMenus = $request->user()
                    ->favorites()
                    ->get();

            return response()->json([
                'success' => true,
                'message' => "Getting user favorites menus",
                'resources' => $userFavoriteMenus
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Internal Server Error!!",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store (Request $request, $id)
    {
        try {
            $menu = Menu::findOrFail($id);
            $user = $request->user();

            $result = $user->favorites()->toggle($menu->id);

            $isAttached = count($result['attached']) > 0;

            return response()->json([
                'success' => true,
                'is_favorite' => $isAttached,
                'message' => $isAttached ? 'Menu ditambahkan ke favorit' : 'Menu dihapus dari favorit',
            ]);
        } catch (ModelNotFoundException $e) {
            // this class exception is usefull for find some data
            // this model use keyword OrFail eloquent for exception
            // ex: where('email', ...)->firstOrfail();
            return response()->json([
                'message' => "Menu item tidak ditemukan!",
                'success' => false
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Internal server error!!",
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
