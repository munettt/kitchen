<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'response', 'log_type', 'command_id'
    ];

    protected $dates = ['created_at'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_at = $model->freshTimestamp();
        });
    }
}
