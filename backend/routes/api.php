<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MenuController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AuthController;

Route::get('/menus', [MenuController::class, 'index']);

Route::prefix('admin')->middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::get('/orders/{id}', [AdminOrderController::class, 'show']);
    Route::get('/order-status', [AdminOrderController::class, 'statusOrder']);

    Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/user')->group(function () {
        Route::get('/', [UserController::class, 'index']);

        // My Order
        Route::get('orders', [UserController::class, 'order']);

        // Favorite
        Route::get('/favorite', [FavoriteController::class, 'index']);
        Route::post('menu/{id}/favorite', [FavoriteController::class, 'store']);
        });

    Route::post('/order', [OrderController::class, 'store']);
});

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
