@extends('layouts.public')

@section('content')
    <div class="container">
        <div class="row pt-5 mt-5">
            <div class="col-md-6 mx-auto">
                <div class="text-center" style="font-size:2.5rem"><i class="icon ion-android-sad text-warning"></i></div>
                <h1 class="text-light text-center mb-5"> Something went wrong</h1>
                <div class="alert alert-danger">{{$exception->getMessage()}}</div>
            </div>
        </div>
    </div>
@endsection