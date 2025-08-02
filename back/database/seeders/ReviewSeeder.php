<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $orders = Order::with(['items.product', 'user'])->where('status', 'delivered')->get();
        
        $comments = [
            'عالی بود، طعم فوق‌العاده‌ای داشت!',
            'کیفیت بالا و تازه بود',
            'خیلی خوشمزه و اصیل',
            'قیمت مناسب و کیفیت عالی',
            'پیشنهاد می‌کنم، واقعاً خوب بود',
            'طعم خانگی و دلچسب',
            'بسته‌بندی مناسب و محصول تازه',
            'از خرید راضی هستم',
            'کیفیت مطابق انتظار بود',
            'سرعت تحویل بالا و محصول خوب'
        ];
        
        foreach ($orders as $order) {
            // احتمال ۷۰٪ برای ثبت نظر
            if (rand(1, 10) <= 7) {
                foreach ($order->items as $item) {
                    Review::create([
                        'user_id' => $order->user_id,
                        'product_id' => $item->product_id,
                        'order_id' => $order->id,
                        'rating' => rand(4, 5), // امتیاز بین 4 تا 5
                        'comment' => $comments[array_rand($comments)],
                        'is_verified_purchase' => true,
                        'created_at' => $order->created_at->addDays(rand(1, 5))
                    ]);
                }
            }
        }
    }
}
