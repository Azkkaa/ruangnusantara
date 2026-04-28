<?php
namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MenuRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->route('id') !== null;

        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_slug' => 'required|exists:categories,slug',
            'image' => $isUpdate ?
                'nullable|image|mimes:jpeg,png,jpg|max:2048' :
                'required|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama menu tidak boleh kosong.',
            'price.required' => 'Harga menu harus diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'category_slug.required' => 'Kategori wajib dipilih.',
            'category_slug.exists' => 'Kategori yang dipilih tidak valid atau tidak ditemukan.',
            'image.required' => 'Gambar menu wajib diunggah.',
            'image.image' => 'File harus berupa gambar.',
            'image.max' => 'Ukuran gambar maksimal 2MB.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $validator->errors()->first()
        ], 422));
    }
}
