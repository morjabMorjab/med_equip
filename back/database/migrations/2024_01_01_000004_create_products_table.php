<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            
            // این ستون جا افتاده بود
            $table->integer('stock_quantity')->default(0);

            $table->string('image_url')->nullable();

            // کلید خارجی برای فروشنده (کاربری که این محصول را اضافه کرده)
            // onDelete('cascade') یعنی اگر کاربری حذف شد، محصولاتش هم حذف شوند
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // کلید خارجی برای دسته‌بندی محصول
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};