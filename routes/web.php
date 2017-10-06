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
Auth::routes();

//social
Route::get('/oauth/login/{provider}', 'Auth\SocialAuthController@login');
Route::get('/oauth/callback/{provider}', 'Auth\SocialAuthController@callback');

Route::middleware(['auth'])->group(function () {

    Route::get('/', 'Front\DashboardController@index')->name('dashboard');

    //resource
    Route::resource('apps', 'Front\AppController');
    Route::resource('commands', 'Front\CommandController');
    Route::resource('backup', 'Front\BackupController');
    Route::resource('users', 'Front\UserController');

    //extra
    Route::get('backup/{id}/create-dir', 'Front\BackupController@createDir')->name('backup.create-dir');
    Route::delete('backup/{id}/delete/{file}', 'Front\BackupController@destroyBackup')->name('backup.delete-file');
    Route::get('backup/file/{file}/download', 'Front\BackupController@downloadFile')->name('backup.download-file');

    Route::get('commands/{command}/exec', 'Front\CommandController@exec')->name('commands.exec');
    Route::get('commands/{command}/recipe', 'Front\CommandController@recipe')->name('commands.recipe');
});