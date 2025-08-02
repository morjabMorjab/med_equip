<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'foods'; // <-- این خط کد حیاتی، مشکل را حل می‌کند

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'chef_id',
        'name',
        'description',
        'price',
        'image_url',
    ];

    /**
     * Get the chef that owns the food.
     */
    public function chef()
    {
        return $this->belongsTo(Chef::class);
    }
}