<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'name' => 'Nasi Goreng Spesial',
                'price' => 18000,
                'image_url' => 'menus/nasi_goreng.jpg',
            ],
            [
                'name' => 'Ayam Geprek',
                'price' => 15000,
                'image_url' => 'menus/ayam_geprek.jpg',
            ],
            [
                'name' => 'Mie Goreng Jawa',
                'price' => 16000,
                'image_url' => 'menus/mie_goreng.jpg',
            ],
            [
                'name' => 'Sate Ayam',
                'price' => 20000,
                'image_url' => 'menus/sate_ayam.jpg',
            ],
            [
                'name' => 'Es Teh Manis',
                'price' => 5000,
                'image_url' => 'menus/es_teh.jpg',
            ],
            [
                'name' => 'Es Jeruk',
                'price' => 7000,
                'image_url' => 'menus/es_jeruk.jpg',
            ],
        ];

        foreach ($menus as $menu) {
            DB::table('menus')->insert([
                'name' => $menu['name'],
                'price' => $menu['price'],
                'image_url' => $menu['image_url'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
