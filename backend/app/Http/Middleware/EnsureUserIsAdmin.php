<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Verifique se o usuário está autenticado e tem o papel de 'admin'
        if (Auth::check() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403); // Acesso negado se não for admin
        }

        return $next($request); // Prosegue com a requisição se for admin
    }
}
