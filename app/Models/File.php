<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'upload_id','upload_type', 'name', 'original_name', 'size', 'meta_1', 'meta_2'
    ];

    protected $dates = ['created_at'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_at = $model->freshTimestamp();
        });
    }

    public function upload()
    {
        return $this->morphTo();
    }
}
