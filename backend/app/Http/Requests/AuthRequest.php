<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
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
     */
    public function rules(): array
    {
        // Validações específicas para cada rota
        if ($this->isRegisterRequest()) {
            return $this->registerRules();
        }

        if ($this->isLoginRequest()) {
            return $this->loginRules();
        }

        return [];
    }

    /**
     * Validações para a rota de registro.
     */
    private function registerRules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Validações para a rota de login.
     */
    private function loginRules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string',
        ];
    }

    /**
     * Identifica se a requisição é para registro.
     */
    private function isRegisterRequest(): bool
    {
        return $this->isMethod('post') && $this->routeIs('auth.register');
    }

    /**
     * Identifica se a requisição é para login.
     */
    private function isLoginRequest(): bool
    {
        return $this->isMethod('post') && $this->routeIs('auth.login');
    }

    /**
     * Customize the error messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O campo nome é obrigatório.',
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'Por favor, forneça um e-mail válido.',
            'email.unique' => 'Este e-mail já está em uso.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            'password.confirmed' => 'A confirmação da senha não corresponde.',
        ];
    }
}
