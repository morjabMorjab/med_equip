<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Promotion;

class PromotionSeeder extends Seeder
{
    public function run(): void
    {
        $promotions = [
            [
                'title' => 'تخفیف ویژه غذاهای سنتی',
                'description' => 'تا ۲۵٪ تخفیف برای تمام غذاهای سنتی خوزستانی',
                'discount_percentage' => 25,
                'start_date' => now(),
                'end_date' => now()->addDays(30),
                'is_active' => true
            ],
            [
                'title' => 'هفته ماهی تازه',
                'description' => 'خرید ماهی تازه با ۲۰٪ تخفیف',
                'discount_percentage' => 20,
                'start_date' => now(),
                'end_date' => now()->addDays(7),
                'is_active' => true
            ],
            [
                'title' => 'فروش ویژه خرما',
                'description' => 'خرید بالای ۲ کیلو خرما با ۱۵٪ تخفیف',
                'discount_percentage' => 15,
                'start_date' => now(),
                'end_date' => now()->addDays(14),
                'is_active' => true
            ]
        ];

        foreach ($promotions as $promotion) {
            Promotion::create($promotion);
        }
    }
}
