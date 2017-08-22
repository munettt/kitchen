@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')

    @if ( count($apps) == 0 )
        <div class="alert alert-warning">No more available applications to create backup for</div>
    @else
    {!! Form::open(['route' => 'backup.store', 'class' => 'form-backup', 'role' => 'form', 'method' => 'post', 'files' => false]) !!}
    @include('front.backup.partials.form')
    {!! Form::close() !!}
    @endif
@endsection