<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chef extends Model
{
    use HasFactory; // <-- این خط مشکل را حل می‌کند

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'bio',
    ];

    /**
     * Get the foods for the chef.
     */
    public function foods()
    {
        return $this->hasMany(Food::class);
    }
}