<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
class PromotionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->sentence(8),
            'image_url' => 'https://picsum.photos/seed/' . Str::random(10) . '/1200/400',
            'is_active' => true,
        ];
    }
}