<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id', 'log_type', 'command_id'
    ];

    protected $dates = ['created_at'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_at = $model->freshTimestamp();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function command()
    {
        return $this->belongsTo(Command::class,'command_id');
    }
}
