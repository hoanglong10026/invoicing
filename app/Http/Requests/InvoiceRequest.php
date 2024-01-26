<?php

namespace App\Http\Requests;

use App\Models\Fruit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'customer_name' => ['required'],
            'invoice_detail.*.fruit_id' => ['required', Rule::exists(Fruit::class, 'id')],
            'invoice_detail.*.quantity' => ['required', 'numeric', 'min:1'],
            'invoice_detail.*.price' => ['required', 'numeric', 'min:1'],
            // validate for updating
            'invoice_detail.*.id' => ['nullable', 'numeric'],
            'invoice_detail.*.delete' => ['nullable', 'boolean'],
        ];
    }
}
