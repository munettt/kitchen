@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')

    <a href="{{route('backup.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>

    @if ( count($apps) == 0 )
        <div class="alert alert-warning">No more available applications to create backup for.</div>
    @else

    {!! Form::open(['route' => 'backup.store', 'name' =>'form-backup', 'class' => 'form-backup validate', 'role' => 'form', 'method' => 'post', 'files' => false]) !!}
    @include('front.backup.partials.form')
    {!! Form::close() !!}
    @endif
@endsection