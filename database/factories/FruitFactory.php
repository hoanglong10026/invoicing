<?php

namespace Database\Factories;

use App\Models\Fruit;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fruit>
 */
class FruitFactory extends Factory
{
    protected $model = Fruit::class;

    public function definition(): array
    {
        return [
            'name' => Str::random(10),
            'unit' => fake()->randomElement(['pcs', 'pack', 'kg']),
            'price' => fake()->numberBetween(100, 1000),
        ];
    }
}
