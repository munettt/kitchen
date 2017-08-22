@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    <a href="{{route('apps.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>
    
    {!! Form::model($app, ['route' => ['apps.update', $app->id], 'role' => 'form', 'method' => 'put', 'files' => false]) !!}
    @include('front.apps.partials.form')
    {!! Form::close() !!}
@endsection