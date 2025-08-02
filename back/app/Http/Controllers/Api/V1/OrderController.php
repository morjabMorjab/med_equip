<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $orders = Order::with(['seller', 'items.product'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json($orders);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'seller_id' => 'required|exists:sellers,id',
            'delivery_address' => 'required|string',
            'delivery_lat' => 'required|numeric',
            'delivery_lng' => 'required|numeric',
            'payment_method' => 'required|in:cash,card,wallet',
            'notes' => 'nullable|string'
        ]);

        $cartItems = Cart::where('user_id', Auth::id())
            ->where('seller_id', $request->seller_id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'سبد خرید خالی است'
            ], 422);
        }

        DB::beginTransaction();
        try {
            // ایجاد سفارش
            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'user_id' => Auth::id(),
                'seller_id' => $request->seller_id,
                'subtotal' => $cartItems->sum('total'),
                'delivery_fee' => 25000, // هزینه ارسال ثابت
                'discount' => 0,
                'total' => $cartItems->sum('total') + 25000,
                'payment_method' => $request->payment_method,
                'delivery_address' => $request->delivery_address,
                'delivery_lat' => $request->delivery_lat,
                'delivery_lng' => $request->delivery_lng,
                'notes' => $request->notes
            ]);

            // ایجاد آیتم‌های سفارش
            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'total' => $item->total
                ]);

                // کاهش موجودی
                $item->product->decrement('stock', $item->quantity);
                $item->product->increment('sales', $item->quantity);
            }

            // پاک کردن سبد خرید
            $cartItems->each->delete();

            DB::commit();

            return response()->json([
                'message' => 'سفارش با موفقیت ثبت شد',
                'order' => $order->load('items.product')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'خطا در ثبت سفارش'
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        $order = Order::with(['seller.user', 'items.product', 'user'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($order);
    }

    public function cancel($id): JsonResponse
    {
        $order = Order::where('user_id', Auth::id())
            ->where('status', 'pending')
            ->findOrFail($id);

        DB::beginTransaction();
        try {
            // بازگرداندن موجودی
            foreach ($order->items as $item) {
                $item->product->increment('stock', $item->quantity);
                $item->product->decrement('sales', $item->quantity);
            }

            $order->update(['status' => 'cancelled']);

            DB::commit();

            return response()->json([
                'message' => 'سفارش لغو شد'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'خطا در لغو سفارش'
            ], 500);
        }
    }
}
