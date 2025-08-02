<?php
namespace App\Http\Controllers\Api\V1\Public;
use App\Http\Controllers\Controller;
use App\Models\Promotion;
class PromotionController extends Controller
{
    public function active()
    {
        return response()->json(Promotion::where('is_active', true)->get());
    }
}