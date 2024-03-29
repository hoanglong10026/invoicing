<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Models\Fruit;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::with(['invoice_details' => function ($query) {
            $query->with(['fruit']);
        }])->get();

        $fruits = Fruit::with('category:id,name')->get();

        return Inertia::render('Invoices/Invoices', [
            'invoices' => $invoices,
            'fruits' => $fruits,
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
    public function store(InvoiceRequest $request)
    {

        $customerName = $request->get('customer_name');
        $invoiceDetails = $request->get('invoice_details', []);

        $invoice = new Invoice();
        $invoice->customer_name = $customerName;
        $invoice->save();

        $total = 0;
        foreach ($invoiceDetails as $detail) {

            $amount = $detail['quantity'] * $detail['price'];
            $invoice->invoice_details()->create([
                'fruit_id' => $detail['fruit_id'],
                'price' => $detail['price'],
                'quantity' => $detail['quantity'],
                'amount' => $amount,
            ]);

            $total += $amount;
        }

        $invoice->amount = $total;
        $invoice->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InvoiceRequest $request, Invoice $invoice)
    {
        $customerName = $request->get('customer_name');
        $invoiceDetails = $request->get('invoice_details', []);

        $invoice->customer_name = $customerName;
        $invoice->save();

        $total = 0;
        foreach ($invoiceDetails as $detail) {

            $amount = $detail['quantity'] * $detail['price'];

            if (!empty($detail['id'])) {
                // delete
                if (!empty($detail['delete'])) {
                    $amount = 0;
                    InvoiceDetail::where('id', $detail['id'])->where('invoice_id', $invoice->id)->delete();
                } else {
                    // edit
                    $invoiceDetail = InvoiceDetail::where('id', $detail['id'])->where('invoice_id', $invoice->id)->firstOrFail();
                    $invoiceDetail->price = $detail['price'];
                    $invoiceDetail->quantity = $detail['quantity'];
                    $invoiceDetail->amount = $amount;
                    $invoiceDetail->save();
                }

            } else {
                // create
                $invoice->invoice_details()->create([
                    'fruit_id' => $detail['fruit_id'],
                    'price' => $detail['price'],
                    'quantity' => $detail['quantity'],
                    'amount' => $amount,
                ]);
            }

            $total += $amount;
        }

        $invoice->amount = $total;
        $invoice->save();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->invoice_details()->delete();
        $invoice->delete();
    }
}
