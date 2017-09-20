@extends('layouts.app')

@section('page-title')
    <h1>{!! $title !!}</h1>
@endsection

@section('content')
    <a href="{{route('backup.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>
    {!! Form::model($backup, ['route' => ['backup.update', $backup->id],'name' =>'form-backup', 'class' => 'form-backup validate', 'role' => 'form', 'method' => 'put', 'files' => false]) !!}
    @include('front.backup.partials.form')
    {!! Form::close() !!}
@endsection