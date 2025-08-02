<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ایجاد یک فروشنده برای محصولات آزمایشی
        User::firstOrCreate(
            ['email' => 'seller@example.com'],
            [
                'name' => 'فروشنده نمونه',
                'password' => Hash::make('password'),
                'role' => 'seller',
            ]
        );

        // ایجاد چند مشتری آزمایشی
        User::firstOrCreate(
            ['email' => 'customer1@example.com'],
            [
                'name' => 'مشتری اول',
                'password' => Hash::make('password'),
                'role' => 'customer',
            ]
        );
    }
}
