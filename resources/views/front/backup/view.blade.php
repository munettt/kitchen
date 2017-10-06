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
            <th>Date</th>
            <th>Size</th>
            <th>Option</th>
        </tr>
        </thead>
        <tbody>
        @if ( count($backup->files) > 0 )
        @foreach ( $backup->files as $file )
            <tr>
                <td><a href="{{route('backup.download-file',$file->id)}}">{{$file->original_name}}</a></td>
                <td>
                    {{ $file->created_at->timezone(session('timezone'))->diffForHumans() }}
                </td>
                <td>
                    {{ formatBytes($file->size) }}
                </td>
                <td>
                    @permission('delete-backup')
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('backup.delete-file',[$backup->id,$file->id])}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                    @endpermission
                </td>
            </tr>
        @endforeach
        @else
            <tr>
                <td colspan="4" class="text-muted">Backup is empty.</td>
            </tr>
        @endif
        </tbody>
    </table>
@endsection