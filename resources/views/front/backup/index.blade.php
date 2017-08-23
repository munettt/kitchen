@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} @permission('create-backup')<a href="{{route('backup.create')}}" class="btn btn-primary btn-rounded">Add New</a>@endpermission</h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Application</th>
                <th>Path</th>
                <th>Frequency</th>
                <th>Last Backup</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @foreach ( $backups as $backup )
            <tr>
                <td><a href="{{route('backup.show',$backup->id)}}">{{$backup->application->domain}}</a></td>
                <td class="text-muted">{{$backup->backup_path}}</td>
                <td>{{$frequencies[$backup->frequency]}}</td>
                <td>
                    @php
                    if ( is_dir($backup->backup_path)) {

                        $files = array_where(scandir($backup->backup_path, SCANDIR_SORT_DESCENDING), function($value) use ($backup) {
                            return is_file($backup->backup_path.'/'.$value);
                        });

                        $newest_file = array_first($files);

                        if ( !empty($newest_file) ) {
                            echo \Carbon\Carbon::createFromTimestamp(filectime($backup->backup_path.'/'.$newest_file))->diffForHumans();
                        } else {
                            echo '<span class="text-muted">Never</span>';
                        }

                    } else {
                        echo 'Invalid dir: backup_path <a class="badge badge-primary" href="'.route('backup.create-dir',$backup->id).'">Create?</a>';
                    }
                    @endphp
                </td>
                <td>
                    @permission('update-backup')
                        <a href="{{route('backup.edit',$backup->id)}}"><i class="icon ion-edit text-warning mr-2"></i></a>
                    @endpermission

                    @permission('delete-backup')
                        <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                        <form class="delete" action="{{route('apps.destroy',$backup->id)}}" method="POST" style="display: none;">
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