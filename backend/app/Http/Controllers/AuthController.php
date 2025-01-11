<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(AuthRequest $request)
    {   
        // Valida os dados recebidos usando AuthRequest
        $validated = $request->validated();

        // Cria um novo usuário
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            
        ]);
       
        // Retorna a resposta com sucesso
        return response()->json([
            'message' => 'Usuário registrado com sucesso!',
            'user' => $user,
        ], 201);
       
    }

    /**
     * Login the user and return a token.
     */
    public function login(AuthRequest $request)
    {
        // Valida as credenciais
        $credentials = $request->validated();

        // Tenta autenticar o usuário
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        // Gera o token
        $token = $request->user()->createToken('auth_token')->plainTextToken;

        // Retorna o token e os dados do usuário
        return response()->json([
            'message' => 'Login realizado com sucesso!',
            'token' => $token,
            'user' => Auth::user(),
        ], 200);
    }
}
