@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} @permission('create-backup')<a href="{{route('backup.create')}}" class="btn btn-primary btn-rounded">Add</a>@endpermission</h1>
@endsection
@section('content')
    <table class="table table-hover table-responsive">
        <thead>
            <tr>
                <th>Application</th>
                <th>Last Backup</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @if ( count($backups) > 0 )
        @foreach ( $backups as $backup )
            <tr>
                <td><a href="{{route('backup.show',$backup->id)}}">{{$backup->application->domain}}</a></td>
                <td>
                    {{ isset($backup->latestFile) ? $backup->latestFile->created_at->timezone(session('timezone'))->diffForHumans() : '-' }}
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
        @else
            <tr>
                <td colspan="3" class="text-muted">No backups configured yet.</td>
            </tr>
        @endif
        </tbody>
    </table>
@endsection