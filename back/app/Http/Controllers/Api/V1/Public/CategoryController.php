<?php
namespace App\Http\Controllers\Api\V1\Public;
use App\Http\Controllers\Controller;
use App\Models\Category;
class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }
}