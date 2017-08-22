@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    {!! Form::open(['route' => 'commands.store', 'class'=>'form-cmd', 'role' => 'form', 'method' => 'post', 'files' => false]) !!}
    @include('front.commands.partials.form')
    {!! Form::close() !!}
@endsection