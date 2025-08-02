<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index(): JsonResponse
    {
        $cartItems = Cart::with(['product.seller', 'seller'])
            ->where('user_id', Auth::id())
            ->get()
            ->groupBy('seller_id');

        $response = [];
        foreach ($cartItems as $sellerId => $items) {
            $seller = $items->first()->seller;
            $response[] = [
                'seller' => $seller,
                'items' => $items,
                'subtotal' => $items->sum('total')
            ];
        }

        return response()->json([
            'cart' => $response,
            'total' => $cartItems->flatten()->sum('total')
        ]);
    }

    public function add(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'موجودی کافی نیست'
            ], 422);
        }

        $cart = Cart::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $product->id
            ],
            [
                'seller_id' => $product->seller_id,
                'quantity' => $request->quantity,
                'price' => $product->final_price
            ]
        );

        return response()->json([
            'message' => 'محصول به سبد خرید اضافه شد',
            'cart' => $cart
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        if ($cart->product->stock < $request->quantity) {
            return response()->json([
                'message' => 'موجودی کافی نیست'
            ], 422);
        }

        $cart->update([
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'message' => 'سبد خرید بروزرسانی شد',
            'cart' => $cart
        ]);
    }

    public function remove($id): JsonResponse
    {
        Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->delete();

        return response()->json([
            'message' => 'محصول از سبد خرید حذف شد'
        ]);
    }

    public function clear(): JsonResponse
    {
        Cart::where('user_id', Auth::id())->delete();

        return response()->json([
            'message' => 'سبد خرید خالی شد'
        ]);
    }
}
