<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;

Route::get('/menus', [MenuController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);

Route::prefix('admin')->middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);

    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::get('/orders/{id}', [AdminOrderController::class, 'show']);
    Route::get('/order-status', [AdminOrderController::class, 'statusOrder']);

    Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);

    // CUD(Create Update Delete) Menu
    Route::post('/menu/create', [MenuController::class, 'store']);
    Route::put('/menu/{id}/update', [MenuController::class, 'update']);
    Route::delete('/menu/{id}/delete', [MenuController::class, 'destroy']);

    // Stock Menu
    Route::put('/menu/{id}/stock-update', [StockController::class, 'updateStock']);
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
