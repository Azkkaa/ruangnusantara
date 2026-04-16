<?php

namespace App\Http\Controllers;

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
                    'massage' => 'Sucessfully creating user',
                    'user' => $user
                ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'massage' => 'Failed to Register!!',
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
                    'message' => 'Berhasil Login!!'
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Data not match!!'
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to login!!',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function logout ()
    {

    }
}
