<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shop_name',
        'shop_description',
        'shop_logo',
        'shop_banner',
        'business_types',
        'is_verified',
        'verified_at',
        'rating',
        'total_sales',
        'commission_rate',
        'working_hours'
    ];

    protected $casts = [
        'business_types' => 'array',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
        'rating' => 'decimal:2',
        'total_sales' => 'integer',
        'commission_rate' => 'decimal:2',
        'working_hours' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
