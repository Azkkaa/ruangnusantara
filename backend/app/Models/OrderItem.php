<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['order_id', 'menu_id', 'quantity', 'price', 'subtotal'])]
class OrderItem extends Model
{
    public function menu ()
    {
        return $this->belongsTo(Menu::class);
    }

    public function order ()
    {
        return $this->belongsTo(Order::class);
    }
}
