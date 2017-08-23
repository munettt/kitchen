<?php
namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function hasPermission($permission)
    {
        if ( auth()->guest() || !request()->user()->can($permission) ){
            abort(403, 'You do not have permission to perform this action');
        }
    }
}
