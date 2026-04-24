<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register (Request $request)
    {
        try {
            $credentials = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', Password::defaults()]
            ]);

            $user = User::create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password'])
            ]);

            Auth::login($user);

            return response()->json([
                    'success' => true,
                    'massage' => 'User berhasil dibuat'
                ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'massage' => 'Internal Server Error!!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login (Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required']
            ]);

            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                return response()->json([
                    'success' => true,
                    'login_status' => true,
                    'message' => 'Anda Berhasil Login',
                    'user' => new UserResource($request->user()->load('favorites'))
                ], 200);
            }

            return response()->json([
                'success' => true,
                'login_status' => false,
                'message' => 'Email atau Password anda salah!!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error!!',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function logout (Request $request)
    {
        try {
            Auth::guard('web')->logout();

            $request->session()->invalidate();

            $request->session()->regenerateToken();

            return response()->json([
                'success' => true,
                'message' => 'Berhasil Logout!!'
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
