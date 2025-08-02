<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller {
    public function initiate(Request $request) {
        return response()->json(['message' => 'پرداخت آغاز شد']);
    }

    public function verify(Request $request) {
        return response()->json(['status' => 'موفق']);
    }
}
