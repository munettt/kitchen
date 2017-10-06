<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    protected $fillable = [

        'keep',
        'app_id',
        'location',
        'backup_url',
        'backup_path',
    ];

    public function application()
    {
        return $this->belongsTo(App::class,'app_id');
    }

    /**
     * Get all of the backup's files.
     */
    public function files()
    {
        return $this->morphMany(File::class, 'upload')->orderBy('created_at', 'desc');
    }

    /**
     * Latest File
     */
    public function latestFile()
    {
        return $this->morphOne(File::class,'upload')->latest();
    }
}
