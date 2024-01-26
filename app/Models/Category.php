<?php

namespace App\Models;

use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
    ];

    protected static function newFactory(): Factory
    {
        return CategoryFactory::new ();
    }

    public function fruits()
    {
        return $this->hasMany(Fruit::class, 'category_id', 'id');
    }
}
