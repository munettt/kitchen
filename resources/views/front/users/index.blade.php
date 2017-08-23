@extends('layouts.app')

@section('page-title')
    <h1>{{$title}}</h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @foreach ( $users as $user)
            <tr>
                <td width="25%">{{$user->name}}</td>
                <td width="30%">{{$user->email}}</td>
                <td width="30%">{{ isset($user->roles) && count($user->roles) > 0 ? $user->roles->first()->name : null }}</td>
                <td>
                    <a href="{{route('users.edit',$user->id)}}"><i class="icon ion-edit text-warning mr-2"></i></a>
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('users.destroy',$user->id)}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>

                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
    {!! $users->links() !!}
@endsection