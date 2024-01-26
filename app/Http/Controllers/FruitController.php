<?php

namespace App\Http\Controllers;

use App\Http\Requests\FruitRequest;
use App\Models\Category;
use App\Models\Fruit;
use Inertia\Inertia;

class FruitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fruits = Fruit::with(['category:id,name'])->get();
        $categories = Category::all();

        return Inertia::render('Fruits/Fruits', [
            'categories' => $categories,
            'fruits' => $fruits
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FruitRequest $request)
    {
        $fruit = new Fruit();
        $fruit->name = $request->get('name');
        $fruit->unit = $request->get('unit');
        $fruit->price = $request->get('price');
        $fruit->category_id = $request->get('category_id', '');

        $fruit->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Fruit $fruit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fruit $fruit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FruitRequest $request, Fruit $fruit)
    {
        $fruit->name = $request->get('name');
        $fruit->unit = $request->get('unit');
        $fruit->price = $request->get('price');
        $fruit->category_id = $request->get('category_id', '');

        $fruit->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fruit $fruit)
    {
        $fruit->delete();
    }
}
