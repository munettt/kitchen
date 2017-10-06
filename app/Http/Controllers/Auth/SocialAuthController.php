<?php

namespace App\Http\Controllers\Auth;

use Laravel\Socialite\Facades\Socialite;
use App\Services\SocialAccountService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SocialAuthController extends Controller
{
    /**
     * Create a redirect method for login request
     * @param string $provider
     * @return void
     */
    public function login(string $provider)
    {
        $this->checkProvider($provider);

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Return a callback method from provider.
     *
     * @param $provider
     * @param $service
     * @param $request
     * @return callback URL from twitter
     */
    public function callback(string $provider, SocialAccountService $service, Request $request)
    {
        $this->checkProvider($provider);

        // what ?
        if (! $request->all()) {
            return redirect()->route('dashboard');
        }

        $user = $service->createOrGetUser(Socialite::driver($provider)->user(),$provider);

        auth()->login($user, config('kitchen.auth.social.remember-me'));

        return redirect()->route('dashboard');
    }

    protected function checkProvider($provider)
    {
        if (! in_array($provider, $this->getProviders()) ) {

            flash('Not a valid social OAuth provider.')->error();

            return redirect()->route('dashboard');
        }
    }

    protected function getProviders()
    {
        return array_keys(config('kitchen.auth.social.services'));
    }
}
