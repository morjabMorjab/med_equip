<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            Log::info('درخواست دریافت دسته‌بندی‌ها');
            
            $sampleCategories = [
                [
                    'id' => 1,
                    'name' => 'غذاهای سنتی',
                    'slug' => 'traditional-foods',
                    'description' => 'انواع غذاهای سنتی خوزستانی',
                    'image' => 'https://picsum.photos/200/150?random=1',
                    'is_active' => true,
                    'sort_order' => 1
                ],
                [
                    'id' => 2,
                    'name' => 'ماهی و غذاهای دریایی',
                    'slug' => 'seafood',
                    'description' => 'انواع ماهی تازه و غذاهای دریایی',
                    'image' => 'https://picsum.photos/200/150?random=2',
                    'is_active' => true,
                    'sort_order' => 2
                ],
                [
                    'id' => 3,
                    'name' => 'خرما و خشکبار',
                    'slug' => 'dates-nuts',
                    'description' => 'انواع خرما و خشکبار محلی',
                    'image' => 'https://picsum.photos/200/150?random=3',
                    'is_active' => true,
                    'sort_order' => 3
                ]
            ];
            
            return response()->json([
                'success' => true,
                'data' => $sampleCategories,
                'message' => 'دسته‌بندی‌ها با موفقیت دریافت شدند'
            ]);
            
        } catch (\Exception $e) {
            Log::error('خطا در دریافت دسته‌بندی‌ها', [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'خطا در دریافت دسته‌بندی‌ها: ' . $e->getMessage(),
                'data' => []
            ], 500);
        }
    }
    
    public function show($id): JsonResponse
    {
        try {
            Log::info('درخواست دریافت دسته‌بندی', ['id' => $id]);
            
            $sampleCategory = [
                'id' => (int)$id,
                'name' => 'دسته‌بندی شماره ' . $id,
                'slug' => 'category-' . $id,
                'description' => 'توضیحات دسته‌بندی شماره ' . $id,
                'image' => 'https://picsum.photos/200/150?random=' . $id,
                'is_active' => true,
                'sort_order' => (int)$id
            ];
            
            return response()->json([
                'success' => true,
                'data' => $sampleCategory,
                'message' => 'دسته‌بندی با موفقیت دریافت شد'
            ]);
            
        } catch (\Exception $e) {
            Log::error('خطا در دریافت دسته‌بندی', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'دسته‌بندی یافت نشد',
                'data' => null
            ], 404);
        }
    }
}
