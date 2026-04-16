<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MenuController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

Route::get('/menus', [MenuController::class, 'index']);

Route::post('/orders', [OrderController::class, 'store']);

Route::prefix('admin')->group(function () {
    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::get('/orders/{id}', [AdminOrderController::class, 'show']);
    Route::get('/order-status', [AdminOrderController::class, 'statusOrder']);

    Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
});

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        $request->user()
    ]);
});
