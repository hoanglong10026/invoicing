<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_categories_page(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('categories.index'));

        $response->assertOk();
    }

    public function test_create_new_category(): void
    {
        $user = User::factory()->create();

        $data = [
            'name' => fake()->sentence(10),
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('categories.store'), $data);

        $response->assertOk();
        $this->assertDatabaseHas('categories', ['name' => $data['name']]);
    }

    public function test_create_new_category_empty_name(): void
    {
        $user = User::factory()->create();

        $data = [
            'name' => '',
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('categories.store'), $data);

        $response->assertStatus(302);
    }

    public function test_create_new_category_duplicate_name(): void
    {
        $user = User::factory()->create();

        $data = [
            'name' => fake()->sentence(10),
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('categories.store'), $data);

        $response = $this
            ->actingAs($user)
            ->post(route('categories.store'), $data);

        $response->assertStatus(302);
    }

    public function test_create_new_category_update_name(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $data = [
            'name' => fake()->sentence(10),
        ];

        $response = $this
            ->actingAs($user)
            ->put(route('categories.update', ['category' => $category->id]), $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('categories', ['name' => $data['name']]);
    }

    public function test_delete_category()
    {

        $user = User::factory()->create();
        $category = Category::factory()->create();

        $id = $category->id;
        $response = $this
            ->actingAs($user)
            ->delete(route('categories.destroy', ['category' => $id]));
        $response->assertStatus(200);
        $this->assertDatabaseMissing('categories', ['id' => $id]);
    }
}
