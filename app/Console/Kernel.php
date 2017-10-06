<?php

namespace App\Console;

use App\Models\Backup;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        if(config('kitchen.scheduler')) {
            $backups = Backup::all();

            foreach ($backups as $backup) {

                $schedule->command('kitchen:backup-clean ' . $backup->id)->dailyAt('00:00')->timezone(env('APP_TIMEZONE',config('app.timezone')));
                $schedule->command('kitchen:backup ' . $backup->app_id)->dailyAt('1:00')->timezone(env('APP_TIMEZONE',config('app.timezone')));

            }
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
