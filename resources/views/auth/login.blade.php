@extends('layouts.public')
@section('content')
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card">
                <div class="card-body mt-2">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group">

                            <input id="email" placeholder="Email Address" type="email" class="form-control {{ $errors->has('email') ? 'is-invalid' : '' }}" name="email"
                                   value="{{ old('email') }}" required autofocus>

                            @if ($errors->has('email'))
                                <span class="invalid-feedback">{{ $errors->first('email') }}</span>
                            @endif
                        </div>

                        <div class="form-group">
                            <input placeholder="Password" id="password" type="password" class="form-control {{ $errors->has('password') ? 'is-invalid' : '' }}"
                                   name="password" required>

                            @if ($errors->has('password'))
                                <span class="invalid-feedback">{{ $errors->first('password') }}</span>
                            @endif
                        </div>

                        <div class="form-group d-flex justify-content-between">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                    Remember Me
                                </label>
                            </div>
                            <div>
                                <a href="{{ route('password.request') }}">Forgot Your Password?</a>
                            </div>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-block btn-lg btn-primary btn-alt">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                @if ( !empty(config('kitchen.auth.social')) )
                    <div class="card-footer">
                        <div class="text-label mb-1" style="">Login using:</div>
                        @foreach(config('kitchen.auth.social.services') as $provider => $icon)
                            <a href="{{url('/oauth/login/'.$provider)}}" class="btn btn-secondary btn-sm"><i class="icon {{$icon}} mr-1"></i> {{ucfirst($provider)}}</a>
                        @endforeach
                    </div>
                @endif
            </div>

            @if(config('kitchen.users.registration'))
            <div class="mt-3 card">
                <div class="card-body text-muted text-small">
                    Don't have an account yet? <a href="{{route('register')}}">Sign up</a>
                </div>
            </div>
            @endif

        </div>

    </div>
@endsection
