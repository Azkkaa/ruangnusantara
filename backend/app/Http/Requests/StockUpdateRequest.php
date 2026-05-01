<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class StockUpdateRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'stock' => ['required', 'integer', 'min:0']
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'stock.required' => 'Stock item tidak boleh kosong',
            'stock.integer' => 'Stock harus berupa angka',
            'stock.min' => 'Minimal stock adalah 0'
        ];
    }
}
