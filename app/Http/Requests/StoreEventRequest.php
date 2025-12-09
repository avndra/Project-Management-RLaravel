<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorized for now, can add role checks later
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date_format:Y-m-d\TH:i',
            'end_time' => 'required|date_format:Y-m-d\TH:i|after:start_time',
            'participants' => 'nullable|array',
            'participants.*' => 'exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'start_time.date_format' => 'Format waktu mulai tidak valid. Gunakan format YYYY-MM-DDTHH:MM',
            'end_time.date_format' => 'Format waktu selesai tidak valid. Gunakan format YYYY-MM-DDTHH:MM',
            'end_time.after' => 'Waktu selesai harus lebih lambat dari waktu mulai',
        ];
    }
}
