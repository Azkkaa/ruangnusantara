<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index (Request $request)
    {
        try {
            $user = $request->user()->load('favorites');

            return new UserResource($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Internal Server error!!",
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
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
                'message' => 'Getting user order',
                'orders' => $userOrder
                ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error!!',
                'error' => $e->getMessage()
            ]);
        }
    }
}
