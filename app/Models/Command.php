<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    protected $fillable = [
        'app_id', 'title', 'recipe'
    ];

    public function application()
    {
        return $this->belongsTo(App::class,'app_id');
    }
}
