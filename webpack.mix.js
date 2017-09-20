let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/*
made changes to support b4
mix.copyDirectory(
    'node_modules/bootstrap-select/dist',
    'public/js/vendor/bootstrap-select'
);*/

mix.js('resources/assets/js/app.js', 'public/js')
    .babel([
        'resources/assets/js/app.vendor.js',
        'public/js/vendor/bootstrap-select/js/bootstrap-select.js',
        'node_modules/parsleyjs/dist/parsley.min.js'

    ], 'public/js/app.vendor.js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .sass('resources/assets/sass/vendor.scss', 'public/css');

mix.combine([
    'public/js/vendor/bootstrap-select/css/bootstrap-select.css',
    'public/css/vendor.css'
], 'public/css/vendor.css');