<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    protected $fillable = [
        'domain', 'path', 'ssh_name', 'ssh_pubkey', 'server_ip', 'db_host', 'db_name', 'db_username', 'db_password'
    ];

    public function backup()
    {
        return $this->hasOne(Backup::class, 'app_id');
    }

}
