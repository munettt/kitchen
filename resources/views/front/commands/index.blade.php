@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} @permission('create-commands')<a href="{{route('commands.create')}}" class="btn btn-primary btn-rounded">Add</a>@endpermission</h1>
@endsection
@section('content')
    <table class="table table-hover table-responsive">
        <thead>
            <tr>
                <th>Command</th>
                <th>Application</th>
                <th>Run</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @if ( count($commands) > 0 )
        @foreach ( $commands as $command )
            <tr>
                <td>{{$command->title}}</td>
                <td>
                @if ( isset($command->application))
                    {{ $command->application->domain OR '' }}
                    @if ( !empty($command->application->ssh_ip) )
                        <small class="text-muted ">({{$command->application->ssh_ip}})</small>
                    @endif
                @endif
                </td>
                <td><button class="btn btn-secondary btn-sm btn-cmd" data-id="{{$command->id}}"><i class="mr-1 icon ion-flash"></i> Run Command</button></td>
                <td>
                    @permission('update-commands')
                        <a href="{{route('commands.edit',$command->id)}}"><i class="icon ion-edit text-warning mr-2"></i></a>
                    @endpermission

                    @permission('delete-commands')
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('commands.destroy',$command->id)}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                    @endpermission
                </td>
            </tr>
        @endforeach
        @else
            <tr>
                <td colspan="4" class="text-muted">No commands created yet.</td>
            </tr>
        @endif
        </tbody>
    </table>

    {!! $commands->links() !!}

    <div class="modal fade" id="modalCommand" tabindex="-1" role="dialog" aria-labelledby="modalCommandLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalCommandLabel">Run Command</h5>
                </div>
                <div class="modal-body">
                    <div id="command-box">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('body')
    <div id="command-sidebar" class="closed">
        <div id="exec-body" class="cmd-text"></div>
        <div>
            <button class="btn btn-primary" onclick="toggleCommandSidebar()">Close</button>
        </div>
    </div>
@endpush

@include('front.commands.partials.scripts-index')