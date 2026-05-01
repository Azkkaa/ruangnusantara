<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['customer_name', 'phone', 'notes', 'total_price', 'status'])]
class Order extends Model
{
    const UPDATED_AT = null;

    public function orderItem ()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', ['pending', 'process']);
    }
}
