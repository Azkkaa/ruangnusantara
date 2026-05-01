<?php

namespace Database\Seeders;

use App\Models\Menu;
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
                'price' => 15000,
                'image_url' => 'menus/nasi_goreng.jpg',
                'stock' => 10,
                'category_id' => 1,
                'is_avaible' => true
            ],
            [
                'name' => 'Ayam Geprek',
                'price' => 10000,
                'image_url' => 'menus/ayam_geprek.jpg',
                'stock' => 10,
                'category_id' => 1,
                'is_avaible' => true
            ],
            [
                'name' => 'Mie Goreng Jawa',
                'price' => 13000,
                'image_url' => 'menus/mie_goreng.jpg',
                'stock' => 10,
                'category_id' => 1,
                'is_avaible' => true
            ],
            [
                'name' => 'Sate Ayam',
                'price' => 17000,
                'image_url' => 'menus/sate_ayam.jpg',
                'stock' => 10,
                'category_id' => 1,
                'is_avaible' => true
            ],
            [
                'name' => 'Es Teh Manis',
                'price' => 4000,
                'image_url' => 'menus/es_teh.jpg',
                'stock' => 10,
                'category_id' => 2,
                'is_avaible' => true
            ],
            [
                'name' => 'Es Jeruk',
                'price' => 5000,
                'image_url' => 'menus/es_jeruk.jpg',
                'stock' => 10,
                'category_id' => 2,
                'is_avaible' => true
            ],
            [
                'name' => 'Kentang Goreng',
                'price' => 8000,
                'stock' => 10,
                'image_url' => 'menus/kentang_goreng.jpg',
                'category_id' => 3,
                'is_avaible' => true
            ]
        ];

        foreach ($menus as $menuData) {
            $menu = Menu::create([
                'name' => $menuData['name'],
                'price' => $menuData['price'],
                'image_url' => $menuData['image_url'],
                'stock' => $menuData['stock'],
                'is_avaible' => $menuData['is_avaible'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $menu->categories()->attach($menuData['category_id']);
        }
    }
}
