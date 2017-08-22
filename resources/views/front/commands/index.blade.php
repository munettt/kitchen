@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} <a href="{{route('commands.create')}}" class="btn btn-primary btn-rounded">Add New</a></h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Command</th>
                <th>Application</th>
                <th>Run</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @foreach ( $commands as $command )
            <tr>
                <td>{{$command->title}}</td>
                <td>{{ isset($command->application) ? $command->application->domain : null}}</td>
                <td><a href="#" class="btn btn-secondary btn-sm">Run Command</a></td>
                <td>
                    <a href="{{route('commands.edit',$command->id)}}"><i class="icon ion-edit text-warning mr-2"></i></a>
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('commands.destroy',$command->id)}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

    {!! $commands->links() !!}

@endsection