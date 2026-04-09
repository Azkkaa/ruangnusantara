<?php

namespace App\Http\Requests\Order;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
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
            'customerName' => ['required', 'string', 'max:255'],
            'phone' => [
                'required',
                'string',
                'min:10',
                'max:15',
                'regex:/^(08)[0-9]{8,13}$/',
            ],
            'notes' => ['nullable', 'string', 'max:255'],
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'exists:menus,id'],
            'items.*.quantity' => ['required', 'min:1']
        ];
    }

    public function messages()
    {
        return [
            'phone.regex' => 'Format tidak valid. Gunakan awalan 08...',
            'phone.min' => 'Nomor HP minimal 10 maximal 15.',
            'items.*.id' => 'Salah satu menu yang dipilih tidak tersedia di sistem kami.'
        ];
    }
}
