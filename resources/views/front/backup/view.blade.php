@extends('layouts.app')

@section('page-title')
    <h1>{{$title}}</h1>
@endsection
@section('content')
    <a href="{{route('backup.index')}}" class="btn btn-light mb-3"><i class="icon ion-chevron-left"></i> Back</a>

    <table class="table table-hover">
        <thead>
        <tr>
            <th>File</th>
            <th>Timestamp</th>
        </tr>
        </thead>
        <tbody>
        @foreach ( $files as $file )
            <tr>
                <td><a href="{{$backup->backup_url.'/'.$file}}" target="_blank">{{$file}}</a></td>
                <td>
                    {{ \Carbon\Carbon::createFromTimestamp(filectime($backup->backup_path.'/'.$file))->diffForHumans() }}
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection