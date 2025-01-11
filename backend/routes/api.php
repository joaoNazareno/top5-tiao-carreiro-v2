<?php

use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\AuthController;

// Agrupe suas rotas que precisam do middleware do Sanctum
Route::middleware([EnsureFrontendRequestsAreStateful::class])->group(function () {

    // Rotas de autenticação
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');;
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    // Rotas protegidas para usuários autenticados
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('musics', [MusicController::class, 'index']);
        Route::get('musics/pending', [MusicController::class, 'pending'])->middleware('isAdmin');
        Route::post('musics', [MusicController::class, 'store']);
        Route::put('musics/{music}', [MusicController::class, 'update'])->middleware('isAdmin');
        Route::delete('musics/{music}', [MusicController::class, 'destroy'])->middleware('isAdmin');
        Route::patch('musics/{music}/approve', [MusicController::class, 'approve'])->middleware('isAdmin');
        Route::patch('musics/{music}/reject', [MusicController::class, 'reject'])->middleware('isAdmin');
    });
});
