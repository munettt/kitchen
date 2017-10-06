@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    <a href="{{route('apps.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>
    
    {!! Form::model($user, ['route' => ['users.update', $user->id], 'role' => 'form', 'method' => 'put', 'files' => false, 'class' => 'validate']) !!}
    @include('front.users.partials.form')
    {!! Form::close() !!}
@endsection