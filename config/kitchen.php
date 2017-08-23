<?php

return [
    'scheduler' => env('APP_SCHEDULER', false),
    'allowed-domains' => env('APP_ALLOWED_DOMAIN',null),
    'auth' => [
        'oauth'    => ['google']
    ]
];