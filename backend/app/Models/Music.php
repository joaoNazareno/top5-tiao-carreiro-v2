<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $table = 'musics'; // Nome correto da tabela

    protected $fillable = [
        'title',
        'artist',
        'link',
        'status',
    ];
}
