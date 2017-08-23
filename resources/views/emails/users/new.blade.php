@component('mail::message')
# {{ $content['title'] }}

{{ $content['body'] }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
