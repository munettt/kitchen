@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} @permission('create-backup')<a href="{{route('backup.create')}}" class="btn btn-primary btn-rounded">Add New</a>@endpermission</h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Application</th>
                {{--<th>Path</th>--}}
                <th>Lastest Backup</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @foreach ( $backups as $backup )
            <tr>
                <td><a href="{{route('backup.show',$backup->id)}}">{{$backup->application->domain}}</a></td>
                {{--<td class="text-muted">{{$backup->backup_path}}</td>--}}
                <td>
                    {{ isset($backup->latestFile) ? $backup->latestFile->created_at->timezone(Session::get('timezone'))->diffForHumans() : '-' }}
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