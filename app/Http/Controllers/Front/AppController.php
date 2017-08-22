<?php

namespace App\Http\Controllers\Front;

use App\Models\App;
use Illuminate\Http\Request;

class AppController extends BaseController
{
    public function __construct()
    {
        parent::__construct();

        view()->share('title', 'Applications');
        view()->share('nav', 'apps');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $apps = App::all();

        return view('front.apps.index',compact('apps'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('front.apps.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        App::create($request->all());

        flash('Application created.');

        return redirect()->route('apps.index');
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
        $app = App::findOrFail($id);

        return view('front.apps.edit',compact('app'));
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
        $app = App::findOrFail($id);

        $app->update($request->all());

        flash('Application updated.');

        return redirect()->route('apps.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        App::findOrFail($id)->delete();

        flash('Application deleted.');

        return redirect()->route('apps.index');
    }
}
