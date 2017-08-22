@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    <a href="{{route('commands.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>
    {!! Form::model($command, ['route' => ['commands.update', $command->id], 'class'=>'form-cmd', 'role' => 'form', 'method' => 'put', 'files' => false]) !!}
    @include('front.commands.partials.form')
    {!! Form::close() !!}
@endsection