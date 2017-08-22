@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    {!! Form::model($backup, ['route' => ['backup.update', $backup->id],'class' => 'form-backup', 'role' => 'form', 'method' => 'put', 'files' => false]) !!}
    @include('front.backup.partials.form')
    {!! Form::close() !!}
@endsection