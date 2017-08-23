@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} @permission('create-apps')<a href="{{route('apps.create')}}" class="btn btn-primary btn-rounded">Add New</a>@endpermission</h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Domain</th>
                <th>Path</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @foreach ( $apps as $app )
            <tr>
                <td>{{$app->domain}}</td>
                <td>{{$app->path}}</td>
                <td>
                    @permission('update-apps')
                        <a href="{{route('apps.edit',$app->id)}}"><i class="icon ion-edit text-warning mr-2"></i></a>
                    @endpermission

                    @permission('delete-apps')
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('apps.destroy',$app->id)}}" method="POST" style="display: none;">
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