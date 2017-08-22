<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="{{asset('/favicon.ico')}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ isset($title) ? $title .' - ' : null }}{{ config('app.name', 'Laravel') }}</title>

    {!! Html::style(elixir('css/app.css')) !!}
</head>
<body class="public">


    @include('flash::message')
    @yield('content')


{!! Html::script(mix('js/app.js')) !!}
{!! Html::script(asset('js/app.vendor.js')) !!}
@stack('scripts')
</body>
</html>