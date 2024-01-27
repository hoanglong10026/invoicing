<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Fruit;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoicesTest extends TestCase
{
    use RefreshDatabase;
    public function test_invoices_page(): void
    {
        $user = User::factory()->create();

        $categories = Category::factory(5)->create();

        $categories->map(function ($category) {
            Fruit::factory(2)->create([
                'category_id' => $category->id,
            ]);
        });

        Invoice::factory(10)->create()->each(function ($invoice) {

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
                    'amount' => $amount,
                ]);

                $total += $amount;
            });

            $invoice->amount = $total;
            $invoice->save();
        });

        $response = $this
            ->actingAs($user)
            ->get(route('invoices.index'));

        $response->assertOk();
    }

    public function test_create_new_invoice(): void
    {
        $user = User::factory()->create();

        // create data
        $categories = Category::factory(5)->create();
        $categories->map(function ($category) {
            Fruit::factory(2)->create([
                'category_id' => $category->id,
            ]);
        });

        $fruitsId = Fruit::get()->pluck('id');
        $ids = fake()->randomElements($fruitsId, 2);
        $fruits = Fruit::whereIn('id', $ids)->get();

        $invoice_details = [];
        $fruits->each(function ($fruit) use (&$invoice_details) {
            $quantity = fake()->numberBetween(1, 10);
            $invoice_details[] = [
                'fruit_id' => $fruit->id,
                'price' => $fruit->price,
                'quantity' => $quantity,
            ];
        });

        $data = [
            'customer_name' => fake()->name(),
            'invoice_details' => $invoice_details,
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('invoices.store'), $data);

        $response->assertOk();
        $this->assertDatabaseHas('invoices', ['customer_name' => $data['customer_name']]);

        foreach ($invoice_details as $detail) {
            $this->assertDatabaseHas('invoice_details', [
                'fruit_id' => $detail['fruit_id'],
                'price' => $detail['price'],
                'quantity' => $detail['quantity'],
            ]);
        }

    }

    public function test_delete_invoice(): void
    {

        // create data
        $categories = Category::factory(5)->create();

        $categories->map(function ($category) {
            Fruit::factory(2)->create([
                'category_id' => $category->id,
            ]);
        });

        $lastInvoice = null;
        Invoice::factory()->create()->each(function ($invoice) use (&$lastInvoice) {

            $lastInvoice = $invoice;
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
                    'amount' => $amount,
                ]);

                $total += $amount;
            });

            $invoice->amount = $total;
            $invoice->save();
        });

        $user = User::factory()->create();
        $id = $lastInvoice->id;
        $response = $this
            ->actingAs($user)
            ->delete(route('invoices.destroy', ['invoice' => $id]));

        $response->assertOk();
        $this->assertSoftDeleted('invoices', ['id' => $id]);
    }

}
