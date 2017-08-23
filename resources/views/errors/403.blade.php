@extends('layouts.public')

@section('content')
    <div class="container">
        <div class="row pt-5 mt-5">
            <div class="col-md-6 mx-auto">
                <h1 class="text-light text-center mb-3">403 - Not Allowed</h1>
                <div class="alert alert-danger">{{$exception->getMessage()}}</div>
            </div>
        </div>
    </div>
@endsection