@extends('layouts.app')

@section('page-title')
    <h1>{{$title}}</h1>
@endsection
@section('content')
    <div class="row">
        <div class="col-12 col-sm-4">
            <div class="card">
                <div class="card-body">
                    <span class="status-indicator {{ config('kitchen.scheduler') ? 'active' : null }}"></span> Scheduler Active
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-4">
            <div class="card">
                <div class="card-body stats-box">
                    <span class="mx-2">{{$totalApps}}</span>
                    Applications
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-4">
            <div class="card">
                <div class="card-body stats-box">
                    <span class="mx-2">{{$totalCommands}}</span>
                    Commands
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-3">

        </div>
    </div>
    <div class="row mt-4">
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    Latest Backups
                </div>
                <div class="card-body">
                    @foreach ( $backups as $backup )
                    <div class="row">
                        <div class="col-auto mr-auto"><a href="{{route('backup.show',$backup->id)}}">{{$backup->application->domain}}</a></div>
                        <div class="col-auto text-right text-muted">{{$latest[$backup->id] ?? 'Never'}}</div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">
                    Command History
                </div>
                <div class="card-body card-list">
                    @foreach ( $logs as $log )
                        <div class="row">
                            <div class="col-auto mr-auto">
                                {{$log->command->application->domain}} - {{$log->command->title}}<br>
                                <span class="text-small text-muted">{{$log->user->name}}</span>
                            </div>
                            <div class="col-auto text-right text-muted">{{$log->created_at->diffForHumans()}}</div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection