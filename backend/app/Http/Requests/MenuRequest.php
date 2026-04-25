<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string',
            'is_available' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama menu tidak boleh kosong, ya.',
            'name.max' => 'Nama menu maksimal 255 karakter.',
            'description.required' => 'Jangan lupa isi deskripsi menunya.',
            'price.required' => 'Harga wajib diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'price.min' => 'Harga tidak bisa kurang dari 0.',
            'category.required' => 'Kategori menu harus dipilih.',
        ];
    }
}
