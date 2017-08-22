@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} <a href="{{route('backup.create')}}" class="btn btn-primary btn-rounded">Add New</a></h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Application</th>
                <th>Path</th>
                <th>Frequency</th>
                <th>Last Backup</th>
                <th>Delete</th>
            </tr>
        </thead>
        @foreach ( $backups as $backup )
            <tr>
                <td><a href="{{route('backup.show',$backup->id)}}">{{$backup->application->domain}}</a></td>
                <td class="text-muted">{{$backup->backup_path}}</td>
                <td>{{$frequencies[$backup->frequency]}}</td>
                <td>
                    @php
                    if ( is_dir($backup->backup_path)) {
                        $files = scandir($backup->backup_path, SCANDIR_SORT_DESCENDING);
                        $newest_file = $files[0];

                        echo \Carbon\Carbon::createFromTimestamp(filectime($backup->backup_path.'/'.$newest_file))->diffForHumans();
                    } else {
                        echo 'Invalid dir: backup_path';
                    }
                    @endphp
                </td>
                <td>
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('apps.destroy',$backup->id)}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                </td>
            </tr>
        @endforeach
    </table>
@endsection