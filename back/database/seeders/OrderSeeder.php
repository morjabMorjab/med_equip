<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Product;
use App\Models\Seller;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customers = User::where('role', 'customer')->get();
        $products = Product::with('seller')->get();

        foreach ($customers as $customer) {
            // ایجاد 2-3 سفارش برای هر مشتری
            for ($i = 0; $i < rand(2, 3); $i++) {
                $randomProducts = $products->random(rand(1, 3));
                $seller = $randomProducts->first()->seller;
                
                $subtotal = 0;
                $orderItems = [];
                
                foreach ($randomProducts as $product) {
                    if ($product->seller_id === $seller->id) {
                        $quantity = rand(1, 3);
                        $price = $product->discount_price ?? $product->price;
                        $total = $price * $quantity;
                        $subtotal += $total;
                        
                        $orderItems[] = [
                            'product_id' => $product->id,
                            'product_name' => $product->name,
                            'price' => $price,
                            'quantity' => $quantity,
                            'total' => $total
                        ];
                    }
                }
                
                if (!empty($orderItems)) {
                    $deliveryFee = 25000;
                    $total = $subtotal + $deliveryFee;
                    
                    $order = Order::create([
                        'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                        'user_id' => $customer->id,
                        'seller_id' => $seller->id,
                        'subtotal' => $subtotal,
                        'delivery_fee' => $deliveryFee,
                        'discount' => 0,
                        'total' => $total,
                        'status' => ['pending', 'confirmed', 'delivered'][rand(0, 2)],
                        'payment_method' => ['cash', 'card'][rand(0, 1)],
                        'payment_status' => 'paid',
                        'delivery_address' => $customer->address,
                        'delivery_lat' => $customer->lat,
                        'delivery_lng' => $customer->lng,
                        'notes' => 'سفارش نمونه',
                        'created_at' => now()->subDays(rand(1, 30))
                    ]);
                    
                    foreach ($orderItems as $item) {
                        $item['order_id'] = $order->id;
                        OrderItem::create($item);
                    }
                }
            }
        }
    }
}
