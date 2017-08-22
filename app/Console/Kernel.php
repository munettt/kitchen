<?php

namespace App\Console;

use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Console\Scheduling\Schedule;
use App\Console\Commands\BackupCreate;
use Illuminate\Support\Facades\DB;
use App\Models\Backup;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        BackupCreate::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        if(DB::connection()->getDatabaseName()) {
            $backups = Backup::all();

            foreach ($backups as $backup) {
                if ($backup->frequency == 'daily ') {
                    $schedule->command('backup:create --' . $backup->id)->daily();
                } elseif ($backup->frequency == '2x') {
                    $schedule->command('backup:create --' . $backup->id)->twiceDaily(0, 12);
                } elseif ($backup->frequency == '1x') {
                    $schedule->command('backup:create --' . $backup->id)->hourly();
                }
            }
        }
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
