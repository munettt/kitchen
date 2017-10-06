<?php

namespace App\Http\Controllers\Front;

use App\Models\App;
use App\Models\Log;
use App\Models\Backup;
use App\Models\Command;

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

        $backups = Backup::with('application','latestFile')->limit(10)->get();

        //Logs
        $logs = Log::with('user','command.application')->orderBy('created_at','desc')->limit(5)->get();

        return view('front.dashboard.index', compact('totalApps','totalCommands','backups','logs'));
    }
}
