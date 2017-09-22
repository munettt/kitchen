<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SocialAccountService;
use Laravel\Socialite\Facades\Socialite;
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
     * @return callback URL from twitter
     */
    public function callback(string $provider, SocialAccountService $service, Request $request)
    {
        $this->checkProvider($provider);

        if (! $request->all()) {
            return redirect()->to('/dashboard');
        }

        $user = $service->createOrGetUser(Socialite::driver($provider)->user(),$provider);

        auth()->login($user, config('kitchen.auth.remember-me'));

        return redirect()->to('/dashboard');
    }

    protected function checkProvider($provider)
    {
        if (! in_array($provider, config('kitchen.auth.oauth')) ) {
            flash('OAuth provider not a valid type')->error();
            return redirect()->route('dashboard');
        }
    }
}
