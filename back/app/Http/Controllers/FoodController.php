<?php
namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller {
    public function index() {
        return response()->json(Food::all());
    }

    public function store(Request $request) {
        $food = Food::create($request->all());
        return response()->json($food, 201);
    }
}
