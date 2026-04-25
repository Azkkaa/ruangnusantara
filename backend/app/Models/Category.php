<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'slug'])]

class Category extends Model
{
    public function menus ()
    {
        return $this->belongsToMany(Menu::class, 'category_menu');
    }
}
