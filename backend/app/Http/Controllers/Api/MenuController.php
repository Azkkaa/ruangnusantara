<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;

class MenuController extends Controller
{
    public function index ()
    {
        $menus = Menu::with('categories')->get();

        return response()->json([
            'success' => true,
            'message' => 'Getting menu list',
            'resources' => $menus
        ], 200);
    }
}
