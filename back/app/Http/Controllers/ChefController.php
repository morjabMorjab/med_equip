<?php
namespace App\Http\Controllers;
use App\Models\Chef;
use Illuminate\Http\Request;

class ChefController extends Controller {
    public function index() {
        return response()->json(Chef::all());
    }
}
