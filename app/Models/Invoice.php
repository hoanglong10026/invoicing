<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer_name',
        'amount',
    ];

    public function invoice_details()
    {
        return $this->hasMany(InvoiceDetail::class, 'invoice_id', 'id');
    }
}
