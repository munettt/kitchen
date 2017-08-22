@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-md-8 mr-auto">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div class="col-md-8 col-md-offset-4">
                            <a href="{{url('/oauth/login/google')}}" class="btn btn-primary">Login with Google</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
