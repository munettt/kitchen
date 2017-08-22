@extends('layouts.public')

@section('content')
    <div class="container">
        <div class="row pt-5 mt-5">
            <div class="col-md-6 mx-auto text-center">
                <div class="mb-4"><img src="{{asset('images/logo.png')}}" height="100"></div>
                <a href="{{url('/oauth/login/google')}}" class="btn btn-lg btn-outline-primary"><i class="fab fa-google"></i> Login with Google</a>
            </div>
        </div>
    </div>
@endsection