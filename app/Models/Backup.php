<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    protected $fillable = [
        'app_id', 'backup_path', 'backup_url', 'frequency'
    ];

    public function application()
    {
        return $this->belongsTo(App::class,'app_id');
    }
}
