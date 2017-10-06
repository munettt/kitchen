@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    <a href="{{route('apps.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>

    {!! Form::open(['route' => 'apps.store', 'role' => 'form', 'method' => 'post', 'files' => false, 'class' => 'validate']) !!}
    @include('front.apps.partials.form')
    {!! Form::close() !!}
@endsection