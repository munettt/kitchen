<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    protected $fillable = [
        'app_id', 'backup_path', 'backup_url', 'cleanup_all', 'cleanup_daily','cleanup_week','cleanup_month','cleanup_year'
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

    public function latestFile()
    {
        return $this->morphOne(File::class,'upload')->latest();
    }
}
