<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Product; // اضافه کردن مدل Product

class SellerController extends Controller
{
    /**
     * نمایش اطلاعات کامل یک فروشنده به همراه تمام محصولاتش
     * 
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user)
    {
        // اعتبارسنجی وجود کاربر
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'فروشنده مورد نظر یافت نشد.'
            ], 404);
        }

        // بررسی نقش فروشنده
        if ($user->role !== 'seller') {
            return response()->json([
                'success' => false,
                'message' => 'کاربر مورد نظر فروشنده نیست.'
            ], 403);
        }

        try {
            // بارگذاری روابط با eager loading
            $user->load([
                'products' => function($query) {
                    $query->with('category')
                          ->orderBy('created_at', 'desc'); // مرتب سازی جدیدترین ها
                }
            ]);

            // ساختار پاسخ
            $response = [
                'success' => true,
                'data' => [
                    'seller' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'avatar' => $user->avatar_url,
                        'created_at' => $user->created_at,
                    ],
                    'products' => $user->products->map(function($product) {
                        return [
                            'id' => $product->id,
                            'name' => $product->name,
                            'price' => $product->price,
                            'category' => $product->category->name,
                            'image' => $product->image_url,
                            'created_at' => $product->created_at
                        ];
                    })
                ]
            ];

            return response()->json($response);

        } catch (\Exception $e) {
            // خطای سرور
            return response()->json([
                'success' => false,
                'message' => 'خطایی در سرور رخ داده است.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}