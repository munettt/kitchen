<?php

namespace App\Traits;

use App\Models\SocialAccount;

trait HasSocial
{
    public function social()
    {
        return $this->hasOne(SocialAccount::class,'user_id');
    }
}
