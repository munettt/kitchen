<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="{{asset('/favicon.ico')}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ isset($title) ? $title .' - ' : null }}{{ config('app.name', 'Laravel') }}</title>

    {!! Html::style(elixir('css/app.css')) !!}
    {!! Html::style(elixir('css/vendor.css')) !!}
    @stack('styles')
</head>
<body>
<div class="container-fluid">
    <div class="row no-gutters">
        <div class="sidebar col-12 col-md-2 col-lg-1">
            <div class="site-brand"><a href="{{url("/")}}"><img src="{{asset('images/fork.png')}}" alt="logo"></a></div>
            <ul class="nav nav-pills sidebar-nav x-scrollable">
                <li class="nav-item"><a class="nav-link {{$nav=='dashboard'?'active':''}}" href="{{url('/')}}"><i class="icon ion-speedometer"></i> Dashboard <span class="sr-only">(current)</span></a></li>
                <li class="nav-item"><a class="nav-link  {{$nav=='apps'?'active':''}}" href="{{url('/apps')}}"><i class="icon ion-android-cloud-outline"></i> Applications</a></li>
                <li class="nav-item"><a class="nav-link  {{$nav=='commands'?'active':''}}" href="{{url('/commands')}}"><i class="icon ion-clipboard"></i> Commands</a></li>
                <li class="nav-item"><a class="nav-link  {{$nav=='backup'?'active':''}}" href="{{url('/backup')}}"><i class="icon ion-lock-combination"></i> Backup</a></li>
                @role('admin')
                <li class="nav-item"><a class="nav-link {{$nav=='users'?'active':''}}" href="{{url('/users')}}"><i class="icon ion-person-stalker"></i> Users</a></li>
                @endrole
                <li class="nav-item d-sm-none"><a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="icon ion-unlocked"></i> Logout</a></li>
            </ul>
        </div>
        <div class="col-12 col-lg-11 col-md-10 ml-auto">
            <header class="row justify-center">
                <div class="col-9 col-md-6 col-lg-8">
                    {{--<h6 class="badge badge-warning">{{config('app.name')}}</h6>--}}
                    @yield('page-title')
                </div>
                <div class="col-3 col-md-6 col-lg-4 text-left text-md-right d-none d-md-block">
                    <div class="dropdown dropdown-user">

                        <a href="#" class="btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="d-inline-block avatar">
                                <img src="{{auth()->user()->social->avatar}}" alt="" class="rounded-circle">
                                <span class="d-none d-md-inline ml-2">{!! auth()->user()->email !!}</span>
                            </div>

                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <div class="dropdown-item"><a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a></div>
                        </div>
                    </div>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        {{ csrf_field() }}
                    </form>

                </div>
            </header>

            <section class="content-wrapper">
                @include('flash::message')
                @yield('content')
            </section>
        </div>
    </div>
</div>
@stack('body')
{!! Html::script(mix('js/app.js')) !!}
{!! Html::script(mix('js/app.vendor.js')) !!}
@stack('scripts')
</body>
</html>