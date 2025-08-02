<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('category', 'user')->get();
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'seller') {
            return response()->json(['message' => 'Unauthorized. Only sellers can create products.'], 403);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'stock_quantity' => 'required|integer|min:0',
        ]);

        $product = Auth::user()->products()->create($validatedData);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return $product->load('category', 'user');
    }

    public function update(Request $request, Product $product)
    {
        if (Auth::id() !== $product->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'stock_quantity' => 'sometimes|required|integer|min:0',
        ]);

        $product->update($validatedData);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        if (Auth::id() !== $product->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }
        
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.'], 200);
    }
}
