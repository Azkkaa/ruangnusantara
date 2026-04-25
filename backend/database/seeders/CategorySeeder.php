<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'makanan',
            'minuman',
            'snack'
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => Str::ucfirst($category),
                'slug' => Str::slug($category)
            ]);
        }
    }
}
