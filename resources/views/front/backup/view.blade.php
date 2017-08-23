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
            <th>Option</th>
        </tr>
        </thead>
        <tbody>
        @foreach ( $files as $file )
            <tr>
                <td><a href="{{$backup->backup_url.'/'.$file}}" target="_blank">{{$file}}</a></td>
                <td>
                    {{ \Carbon\Carbon::createFromTimestamp(filectime($backup->backup_path.'/'.$file))->diffForHumans() }}
                </td>
                <td>
                    @permission('delete-backup')
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('backup.delete-file',[$backup->id, $file])}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                    @endpermission
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection