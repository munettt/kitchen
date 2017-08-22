@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    {!! Form::open(['route' => 'apps.store', 'role' => 'form', 'method' => 'post', 'files' => false]) !!}
    @include('front.apps.partials.form')
    {!! Form::close() !!}
@endsection