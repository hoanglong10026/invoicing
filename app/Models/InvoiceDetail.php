<?php

namespace App\Models;

use Database\Factories\InvoiceDetailFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceDetail extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'invoice_details';

    protected static function newFactory(): Factory
    {
        return InvoiceDetailFactory::new ();
    }

    protected $fillable = [
        'invoice_id',
        'fruit_id',
        'price',
        'quantity',
        'amount',
    ];

    public function fruit()
    {
        return $this->belongsTo(Fruit::class, 'fruit_id', 'id');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoice_id', 'id');
    }
}
