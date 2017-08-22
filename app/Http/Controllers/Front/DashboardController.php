<?php

namespace App\Http\Controllers\Front;

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
        return view('front.dashboard.index');
    }
}
