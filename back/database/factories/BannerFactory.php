<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
class BannerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->words(2, true),
            'subtitle' => fake()->sentence(5),
            'image_url' => 'https://picsum.photos/seed/' . Str::random(10) . '/1200/400',
            'button_text' => 'مشاهده',
            'is_active' => true,
        ];
    }
}