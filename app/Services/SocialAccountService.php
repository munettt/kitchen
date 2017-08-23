<?php
namespace App\Services;

use Laravel\Socialite\Contracts\User as ProviderUser;
use App\Models\SocialAccount;
use App\Models\User;

class SocialAccountService
{
    public function createOrGetUser(ProviderUser $providerUser, string $provider)
    {
        $account = SocialAccount::whereProvider($provider)
            ->whereProviderUserId($providerUser->getId())
            ->first();

        if ($account)
        {
            return $account->user;
        }
        else
        {
            //check email
            $allowedDomains = config('kitchen.allowed-domains');

            if ( !empty($allowedDomains) )
            {
                $allowedDomains = array_map('trim',explode(',',$allowedDomains));

                if ( !in_array( explode('@', $providerUser->getEmail())[1], $allowedDomains)  )
                {
                    throw new \Exception('Only these domain(s) are allowed to sign in: '.config('kitchen.allowed-domains'));
                }
            }



            //account
            $account = new SocialAccount([
                'provider_user_id' => $providerUser->getId(),
                'provider'         => $provider,
                'avatar'           => $providerUser->getAvatar()
            ]);

            $user = User::whereEmail($providerUser->getEmail())->first();

            if (!$user)
            {
                $user = User::create([
                    'email'    => $providerUser->getEmail(),
                    'name'     => $providerUser->getName(),
                    'password' => str_random(8),
                ]);

                $user->roles()->sync([2]);
            }

            $account->user()->associate($user);
            $account->save();

            return $user;
        }
    }
}