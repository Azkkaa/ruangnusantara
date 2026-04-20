<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Azka Faza',
                'email' => 'azkafaza2107@gmail.com',
                'password' => 'azka2143',
                'is_admin' => false
            ],
            [
                'name' => 'Faza Aqin',
                'email' => 'fazaqin2107@gmail.com',
                'password' => 'aqin2143',
                'is_admin' => false
            ]
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'is_admin' => $user['is_admin']
            ]);
        }
    }
}
