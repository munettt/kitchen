@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    {!! Form::model($app, ['route' => ['apps.update', $app->id], 'role' => 'form', 'method' => 'put', 'files' => false]) !!}
    @include('front.apps.partials.form')
    {!! Form::close() !!}
@endsection