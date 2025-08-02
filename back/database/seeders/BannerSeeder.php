<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Banner;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $banners = [
            [
                'title' => 'غذاهای سنتی خوزستان',
                'subtitle' => 'طعم اصیل جنوب را تجربه کنید',
                'description' => 'بهترین غذاهای محلی و سنتی خوزستان را از آشپزهای خانگی سفارش دهید',
                'image' => 'https://picsum.photos/1200/400?random=60',
                'link' => '/products?category=1',
                'button_text' => 'مشاهده محصولات',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'title' => 'ماهی تازه از خلیج فارس',
                'subtitle' => 'تازه از دریا به سفره شما',
                'description' => 'انواع ماهی تازه و مرغوب را از ماهی‌فروشان معتبر خریداری کنید',
                'image' => 'https://picsum.photos/1200/400?random=61',
                'link' => '/products?category=2',
                'button_text' => 'خرید ماهی تازه',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'title' => 'خرمای اصیل خوزستان',
                'subtitle' => 'شیرین‌ترین طعم طبیعت',
                'description' => 'خرماهای درجه یک و مرغوب خوزستان را مستقیم از باغداران بخرید',
                'image' => 'https://picsum.photos/1200/400?random=62',
                'link' => '/products?category=3',
                'button_text' => 'سفارش خرما',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'title' => 'تخفیف ویژه محصولات',
                'subtitle' => 'تا ۳۰٪ تخفیف',
                'description' => 'از تخفیفات ویژه محصولات منتخب استفاده کنید',
                'image' => 'https://picsum.photos/1200/400?random=63',
                'link' => '/products?discount=true',
                'button_text' => 'مشاهده تخفیفات',
                'is_active' => true,
                'sort_order' => 4
            ]
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}
