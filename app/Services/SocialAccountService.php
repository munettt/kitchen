<?php
namespace App\Services;

use Laravel\Socialite\Contracts\User as ProviderUser;
use Illuminate\Support\Facades\Mail;
use App\Models\SocialAccount;
use App\Mail\NewUser;
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
            $allowedDomains = config('kitchen.auth.social.allowed-domains');

            //check if email belongs in allowed domains
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

                //email admins
                if (config('kitchen.users.notify-admin')) {
                    $admins = User::whereRoleIs('admin')->get();
                    $content = [
                        'title' => 'New user registered',
                        'body'  => 'New user registered: ' . $providerUser->getEmail()
                    ];

                    foreach ($admins as $admin) {
                        Mail::to($admin->email)->send(new NewUser($content));
                    }
                }
            }

            $account->user()->associate($user);
            $account->save();

            return $user;
        }
    }
}