@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} <a href="{{route('apps.create')}}" class="btn btn-primary btn-rounded">Add New</a></h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Domain</th>
                <th>Path</th>
                <th>Delete</th>
            </tr>
        </thead>
        @foreach ( $apps as $app )
            <tr>
                <td>{{$app->domain}}</td>
                <td>{{$app->path}}</td>
                <td>
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('apps.destroy',$app->id)}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                </td>
            </tr>
        @endforeach
    </table>
@endsection