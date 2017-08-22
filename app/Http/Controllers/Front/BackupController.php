<?php

namespace App\Http\Controllers\Front;

use App\Models\App;
use App\Models\Backup;
use Illuminate\Http\Request;

class BackupController extends BaseController
{
    public function __construct()
    {
        parent::__construct();

        view()->share('title', 'Backup');
        view()->share('nav', 'backup');

        $frequencies = ['daily'=>'Daily','2x'=>'Twice Daily','1x' => 'Hourly'];
        view()->share('frequencies', $frequencies);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $backups = (new Backup)->paginate(30);

        return view('front.backup.index',compact('backups'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $apps = App::has('backup','<',1)->get()->pluck('domain','id');

        return view('front.backup.create',compact('apps'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Backup::create($request->all());

        flash('Backup created.');

        return redirect()->route('backup.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $backup = Backup::findOrFail($id);
        $apps = App::all()->pluck('domain','id');

        return view('front.backup.edit',compact('backup','apps'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $backup = Backup::findOrFail($id);

        $backup->update($request->all());

        flash('Backup updated.');

        return redirect()->route('backup.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Backup::findOrFail($id)->delete();

        flash('Backup deleted.');

        return redirect()->route('backup.index');
    }
}
