<?php

return [
    'auth' => [
        'social'       => [
            'services'        => [
                'google'  => 'icon ion-social-google'
            ],
            'remember-me'     => true,
            'allowed-domains' => env('APP_ALLOWED_DOMAIN', null),
        ]
    ],
    'users' => [
        'registration' => false,
        'notify-admin'  => false,

    ],
    'scheduler' => env('APP_SCHEDULER',false),
    'backup' => [
        'keep' => 7
    ]
];