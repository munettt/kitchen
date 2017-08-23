<?php

return [
    'role_structure' => [
        'admin' => [
            'apps' => 'c,r,u,d',
            'commands' => 'c,r,u,d',
            'backup' => 'c,r,u,d'
        ],
        'user' => [
            'apps' => 'r',
            'commands' => 'r',
            'backup' => 'r'
        ],
    ],
    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];
