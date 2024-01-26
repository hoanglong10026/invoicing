<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Fruit;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $categories = Category::factory(5)->create();

        $categories->map(function ($category) {
            Fruit::factory(2)->create([
                'category_id' => $category->id,
            ]);
        });

        Invoice::factory(5)->create()->each(function ($invoice) {

            $fruitsId = Fruit::get()->pluck('id');
            $ids = fake()->randomElements($fruitsId, 2);

            $fruits = Fruit::whereIn('id', $ids)->get();


            $total = 0;
            $fruits->map(function ($fruit) use ($invoice, &$total) {

                $quantity = fake()->numberBetween(1, 10);
                $amount = $quantity * $fruit->price;
                InvoiceDetail::factory()->create([
                    'invoice_id' => $invoice->id,
                    'fruit_id' => $fruit->id,
                    'price' => $fruit->price,
                    'quantity' => $quantity,
                    'amount' => $amount
                ]);

                $total += $amount;
            });

            $invoice->amount = $total;
            $invoice->save();

        });

    }
}
