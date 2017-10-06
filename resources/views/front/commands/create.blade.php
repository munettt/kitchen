@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    <a href="{{route('commands.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>

    {!! Form::open(['route' => 'commands.store', 'class'=>'form-cmd validate', 'role' => 'form', 'method' => 'post', 'files' => false]) !!}
    @include('front.commands.partials.form')
    {!! Form::close() !!}
@endsection