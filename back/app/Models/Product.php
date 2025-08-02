<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock_quantity',
        'image_url',
        'user_id',
        'category_id',
    ];

    /**
     * هر محصول به یک کاربر (فروشنده) تعلق دارد.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * هر محصول به یک دسته‌بندی تعلق دارد.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}