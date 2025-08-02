<?php
namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index()
    {
        $foods = Food::with('chef')
                    ->latest()
                    ->paginate(12);

        return response()->json($foods);
    }
}