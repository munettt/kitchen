<?php
namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
}
