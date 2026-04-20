<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index (Request $request)
    {
        return response()->json($request->user());
    }

    public function order (Request $request)
    {
        try {
            $userOrder = $request->user()
                ->order()
                ->with('orderItem.menu')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'getting user order',
                'orders' => $userOrder
                ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get user order!!',
                'error' => $e->getMessage()
            ]);
        }
    }
}
