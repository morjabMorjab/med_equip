<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chef;
use App\Models\Food;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str; // برای استفاده از Str::random

class FoodSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('foods')->delete();
        DB::table('chefs')->delete();

        $chefs = Chef::factory(10)->create();

        $foodsData = [
            // غذاهای خانگی
            ['name' => 'چلوکباب کوبیده ممتاز', 'rating' => 4.8, 'ratings_count' => 120],
            ['name' => 'قورمه سبزی جا افتاده', 'rating' => 4.9, 'ratings_count' => 215],
            ['name' => 'ته چین مرغ زعفرانی', 'rating' => 4.7, 'ratings_count' => 98],
            ['name' => 'پیتزا مخصوص خانگی', 'rating' => 4.5, 'ratings_count' => 150],
            
            // ماهی و ته لنجی
            ['name' => 'ماهی شوریده تازه جنوب', 'rating' => 4.9, 'ratings_count' => 88],
            ['name' => 'میگو سوخاری پفکی', 'rating' => 4.6, 'ratings_count' => 110],
            ['name' => 'صابون زیتون اصل رودبار', 'rating' => 5.0, 'ratings_count' => 310],
            ['name' => 'تن ماهی شبنم (ته لنجی)', 'rating' => 4.4, 'ratings_count' => 75],

            // خرما و قهوه
            ['name' => 'خرمای پیارم درجه یک', 'rating' => 4.9, 'ratings_count' => 190],
            ['name' => 'رطب مضافتی بم', 'rating' => 4.8, 'ratings_count' => 250],
            ['name' => 'قهوه اسپرسو Lavazza', 'rating' => 4.7, 'ratings_count' => 130],
            ['name' => 'کپسول نسپرسو آرپجیو', 'rating' => 4.9, 'ratings_count' => 95],

            // محصولات دیگر
            ['name' => 'کرم مرطوب کننده QV', 'rating' => 4.8, 'ratings_count' => 420],
            ['name' => 'عسل طبیعی سبلان', 'rating' => 5.0, 'ratings_count' => 300],
            ['name' => 'روغن زیتون فرابکر', 'rating' => 4.7, 'ratings_count' => 180],
            ['name' => 'زعفران سرگل قائنات', 'rating' => 4.9, 'ratings_count' => 220],
            ['name' => 'پسته اکبری شور', 'rating' => 4.6, 'ratings_count' => 145],
            ['name' => 'حلوا ارده سنتی', 'rating' => 4.5, 'ratings_count' => 85],
            ['name' => 'ادویه کاری مخصوص آبادان', 'rating' => 4.9, 'ratings_count' => 195],
            ['name' => 'ترشی لیته خانگی', 'rating' => 4.7, 'ratings_count' => 65],
        ];

        foreach ($foodsData as $foodItem) {
            Food::factory()->create([
                'chef_id' => $chefs->random()->id,
                'name' => $foodItem['name'],
                'rating' => $foodItem['rating'],
                'ratings_count' => $foodItem['ratings_count'],
                // استفاده از Lorem Picsum با Seed تصادفی برای اطمینان از یونیک بودن عکس‌ها
                'image_url' => 'https://picsum.photos/seed/' . Str::random(10) . '/600/400',
            ]);
        }
    }
}