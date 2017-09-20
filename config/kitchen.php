<?php

return [
    'scheduler'       => env('APP_SCHEDULER', false),
    'allowed-domains' => env('APP_ALLOWED_DOMAIN', null),
    'auth'            => [
        'oauth' => ['google']
    ],
    'frequencies'     => [
        'Ymd' => 'Daily',
        'YW'  => 'Weekly',
        'Ym'  => 'Monthly',
        'Y'   => 'Yearly'
    ],
    'backup' => [

        'clean' => [

            'all'   => 7,
            'daily' => 14,
            'week'  => 8,
            'month' => 4,
            'year'  => 2

        ]
    ]
];