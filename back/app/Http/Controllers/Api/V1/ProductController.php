<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['seller.user', 'category'])
            ->active();

        // فیلتر بر اساس دسته‌بندی
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // فیلتر بر اساس فروشنده
        if ($request->has('seller_id')) {
            $query->where('seller_id', $request->seller_id);
        }

        // جستجو
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // فیلتر قیمت
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // مرتب‌سازی
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'sales':
                $query->orderBy('sales', 'desc');
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
        }

        $products = $query->paginate($request->get('per_page', 20));

        return response()->json($products);
    }

    public function show($id): JsonResponse
    {
        $product = Product::with([
            'seller.user',
            'category',
            'reviews.user'
        ])->findOrFail($id);

        // افزایش تعداد بازدید
        $product->increment('views');

        return response()->json($product);
    }

    public function featured(): JsonResponse
    {
        $products = Product::with(['seller.user', 'category'])
            ->active()
            ->featured()
            ->take(12)
            ->get();

        return response()->json($products);
    }

    public function topSelling(): JsonResponse
    {
        $products = Product::with(['seller.user', 'category'])
            ->active()
            ->orderBy('sales', 'desc')
            ->take(12)
            ->get();

        return response()->json($products);
    }

    public function newArrivals(): JsonResponse
    {
        $products = Product::with(['seller.user', 'category'])
            ->active()
            ->orderBy('created_at', 'desc')
            ->take(12)
            ->get();

        return response()->json($products);
    }
}
