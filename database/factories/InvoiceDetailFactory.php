<?php

namespace Database\Factories;

use App\Models\InvoiceDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvoiceDetail>
 */
class InvoiceDetailFactory extends Factory
{
    protected $model = InvoiceDetail::class;

    public function definition(): array
    {
        $price = fake()->numberBetween(100, 10000);
        $quantity = fake()->numberBetween(1, 10);

        return [
            'amount' => $price * $quantity,
            'price' => $price,
            'quantity' => $quantity,
        ];
    }
}
