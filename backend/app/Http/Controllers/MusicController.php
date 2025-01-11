<?php

namespace App\Http\Controllers;

use App\Http\Requests\MusicRequest;
use App\Models\Music;

class MusicController extends Controller
{
    public function index()
    {
        $musics = Music::where('approved', true)->skip(5)->paginate(10);
        return response()->json($musics, 200);
    }

    public function pending()
    {
        // Filtrando as músicas que estão pendentes
        $pendingMusics = Music::where('status', 'pending')->get();
        return response()->json($pendingMusics, 200);
    }


    public function store(MusicRequest $request)
    {
        // Valida os dados recebidos
        $validated = $request->validated();

        // Cria a música com os dados validados
        $music = Music::create([
            'title' => $validated['title'],
            'artist' => $validated['artist'], // Inclua o artista, se necessário
            'link' => $validated['link'],
            'status' => 'pending', // Define o status como 'pending'
        ]);

        // Retorna a resposta JSON
        return response()->json([
            'message' => 'Music suggested successfully',
            'music' => $music,
        ], 201);
    }


    public function update(MusicRequest $request, Music $music)
    {
        $validated = $request->validated();

        $music->update($validated);

        return response()->json(['message' => 'Music updated successfully', 'music' => $music], 200);
    }

    public function destroy(Music $music)
    {
        $music->delete();

        return response()->json(['message' => 'Music deleted successfully'], 200);
    }

    public function approve(Music $music)
    {
        // Atualizando o status da música para 'approved'
        $music->update(['status' => 'approved']);

        return response()->json(['message' => 'Music approved successfully'], 200);
    }

    public function reject(Music $music)
    {
        // Atualizando o status da música para 'rejected'
        $music->update(['status' => 'rejected']);

        return response()->json(['message' => 'Music rejected successfully'], 200);
    }
}
