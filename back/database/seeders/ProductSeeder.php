<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // پیدا کردن فروشنده و دسته‌بندی‌ها
        $seller = User::where('role', 'seller')->first();
        $categories = Category::all();

        if (!$seller || $categories->isEmpty()) {
            $this->command->error('لطفا ابتدا UserSeeder و CategorySeeder را اجرا کنید.');
            return;
        }

        // حذف محصولات قبلی برای جلوگیری از تکرار
        Product::truncate();

        // ایجاد 20 محصول آزمایشی
        for ($i = 1; $i <= 20; $i++) {
            $randomCategory = $categories->random();
            
            Product::create([
                'name' => 'محصول آزمایشی ' . $i . ' (' . $randomCategory->name . ')',
                'description' => 'این یک توضیح نمونه برای محصول آزمایشی است. این محصول با کیفیت بالا و قیمت مناسب عرضه می‌شود.',
                'price' => rand(50000, 1000000), // قیمت تصادفی بین ۵۰ هزار تا ۱ میلیون تومان
                'stock_quantity' => rand(10, 100),
                'user_id' => $seller->id,
                'category_id' => $randomCategory->id,
                'image_url' => 'https://picsum.photos/id/' . rand(1, 500) . '/400/300', // تصویر تصادفی از لورم پیکسوم
            ]);
        }
    }
}
