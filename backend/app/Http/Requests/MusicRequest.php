<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MusicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'link' => 'required|url',
            'status' => 'nullable|in:approved,pending',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título da música é obrigatório.',
            'artist.required' => 'O nome do artista é obrigatório.',
            'link.required' => 'O link da música é obrigatório.',
            'link.url' => 'O link deve ser uma URL válida.',
            'status.in' => 'O status deve ser "approved" ou "pending".',
        ];
    }
}
