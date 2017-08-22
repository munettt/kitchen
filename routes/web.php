<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {


    if ( Auth::guest() === false )
    {
        return redirect()->route('dashboard');
    }

    return view('public.index');
});

Auth::routes();

Route::get('/dashboard', 'Front\DashboardController@index')->name('dashboard');

//social
Route::get('/oauth/login/{provider}', 'Auth\SocialAuthController@login');
Route::get('/oauth/callback/{provider}', 'Auth\SocialAuthController@callback');

//apps
Route::resource('apps', 'Front\AppController');
Route::resource('commands', 'Front\CommandController');
Route::resource('backup', 'Front\BackupController');

//extra
Route::get('backup/{id}/create-dir','Front\BackupController@createDir')->name('backup.create-dir');