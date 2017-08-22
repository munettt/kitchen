<?php

namespace App\Http\Controllers\Front;

use App\Models\App;
use App\Models\Backup;
use App\Models\Command;
use App\Models\Log;
use Carbon\Carbon;
use Collective\Remote\Connection;

class DashboardController extends BaseController
{
    public function __construct()
    {
        parent::__construct();

        view()->share('title', 'Dashboard');
        view()->share('nav', 'dashboard');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $totalApps = App::count();
        $totalCommands = Command::count();

        $latest = [];
        $backups = Backup::with('application')->limit(10)->get();

        foreach ( $backups as $backup )
        {
            $latestFile = '';

            if ( is_dir($backup->backup_path)) {
                $files = array_where(scandir($backup->backup_path, SCANDIR_SORT_ASCENDING), function ($value) use ($backup) {
                    return is_file($backup->backup_path . '/' . $value);
                });

                $latestFile = Carbon::createFromTimestamp(filectime($backup->backup_path.'/'.array_first($files)))->diffForHumans();
            }

            $latest[$backup->id] = $latestFile;

        }

        //Logs
        $logs = Log::with('user','command.application')->orderBy('created_at','desc')->limit(5)->get();

        return view('front.dashboard.index', compact('totalApps','totalCommands','latest','backups','logs'));
    }
}
