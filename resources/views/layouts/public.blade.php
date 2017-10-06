<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="{{asset('/favicon.ico')}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ isset($title) ? $title .' - ' : null }}{{ config('app.name') }}</title>

    {!! Html::style(elixir('css/app.css')) !!}
    {!! Html::style(elixir('css/vendor.css')) !!}
</head>
<body class="public">
<header class="site-header">
    <div class="container text-center">
        <a href="{{url('/')}}"><img src="{{asset('images/logo.png')}}" alt="logo" class="logo"></a>
    </div>
</header>
<div class="container mt-3">

    @include('flash::message')
    @yield('content')

</div>

{!! Html::script(mix('js/app.js')) !!}
{!! Html::script(asset('js/app.vendor.js')) !!}
@stack('scripts')
</body>
</html>