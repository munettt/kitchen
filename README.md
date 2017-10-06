<p align="center"><img src="https://raw.githubusercontent.com/munettt/kitchen/master/docs/screenshot.png"></p>

# Kitchen
Monitor your application backups or run deploy scripts across multiple servers.

## Installation

Clone the application
``` bash
git clone https://github.com/munettt/kitchen.git
```

Create database, create .env file and generate application key

Run composer install
``` bash
composer install
```

Install Kitchen
``` bash
php artisan kitchen:install
```

Login and enjoy!


## Backup
To use the backup feature, you need to enable [laravel's scheduler](https://laravel.com/docs/5.5/scheduling). After doing so just set APP_SCHEDULER to *true* in the `.env` file.

You can also manually run the command

``` bash
php artisan kitchen:backup APP_ID
```
