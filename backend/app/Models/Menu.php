<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'price', 'image_url'])]
class Menu extends Model
{
    public function orderItem()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function favoriteByUsers ()
    {
        return $this->belongsToMany(User::class, 'favorite_menus');
    }

    public function categories ()
    {
        return $this->belongsToMany(Category::class, 'category_menu');
    }
}
