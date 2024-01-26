<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Fruit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FruitsTest extends TestCase
{
    use RefreshDatabase;
    public function test_fruits_page(): void
    {
        $user = User::factory()->create();
        Fruit::factory(10)->create();

        $response = $this
            ->actingAs($user)
            ->get(route('fruits.index'));

        $response->assertOk();
    }

    public function test_create_new_fruit(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $data = [
            'name' => fake()->sentence(10),
            'unit' => fake()->randomElement(['pcs', 'pack', 'kg']),
            'price' => fake()->numberBetween(100, 1000),
            'category_id' => $category->id
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('fruits.store'), $data);

        $response->assertOk();
        $this->assertDatabaseHas('fruits', ['name' => $data['name']]);
    }

    public function test_category_update_name(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $fruit = Fruit::factory()->create();

        $data = [
            'name' => fake()->sentence(10),
            'unit' => fake()->randomElement(['pcs', 'pack', 'kg']),
            'price' => fake()->numberBetween(100, 1000),
            'category_id' => $category->id
        ];

        $response = $this
            ->actingAs($user)
            ->put(route('fruits.update', ['fruit' => $fruit->id]), $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('fruits', ['name' => $data['name']]);
    }

    public function test_delete_fruit()
    {

        $user = User::factory()->create();
        $fruit = Fruit::factory()->create();

        $id = $fruit->id;
        $response = $this
            ->actingAs($user)
            ->delete(route('fruits.destroy', ['fruit' => $id]));
        $response->assertStatus(200);
        $this->assertDatabaseMissing('fruits', ['id' => $id]);
    }
}
