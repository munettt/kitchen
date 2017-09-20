<?php

namespace App\Http\Controllers\Front;

use App\Models\App;
use App\Models\Backup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BackupController extends BaseController
{
    public function __construct()
    {
        parent::__construct();

        view()->share('title', 'Backup');
        view()->share('nav', 'backup');

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->hasPermission('read-backup');

        $backups = (new Backup)->with('latestFile')->paginate(30);

        return view('front.backup.index',compact('backups'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->hasPermission('create-backup');

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
        $this->hasPermission('create-backup');

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
        $this->hasPermission('read-backup');

        $backup = Backup::with('files')->findOrFail($id);

        /*$files = array_where(scandir($backup->backup_path, SCANDIR_SORT_DESCENDING), function($value) use ($backup) {
            return is_file($backup->backup_path.'/'.$value);
        });*/

        return view('front.backup.view', compact('backup'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->hasPermission('update-backup');

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
        $this->hasPermission('update-backup');

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
        $this->hasPermission('delete-backup');

        Backup::findOrFail($id)->delete();

        flash('Backup deleted.');

        return redirect()->route('backup.index');
    }

    public function destroyBackup($id,$file)
    {
        $backup = Backup::findOrFail($id);

        if ( File::exists($backup->backup_path.'/'.$file) ) {

            File::delete($backup->backup_path.'/'.$file);

            flash('File deleted');
        }


        return redirect()->route('backup.show',$id);
    }

    public function createDir($id)
    {
        $this->hasPermission('update-backup');

        $backup = Backup::findOrFail($id);

        $result = File::makeDirectory($backup->backup_path, 0775, true);

        if ( $result ) {
            flash('Backup folder "'.$backup->backup_path.'" created.');
        }
        else
        {
            flash('Unable to create folder "'.$backup->backup_path.'".','danger');
        }

        return redirect()->route('backup.index');
    }

    public function downloadFile($fileId){

        $file = \App\Models\File::findOrFail($fileId);
        $backup = $file->upload->first();

        //check
        if ( $backup->location == 'local' ) {
            return response()->download($backup->backup_path . '/' . $file->name);
        } else {

            return response()->stream(function() use ($file) {
                $stream = Storage::disk(config('filesystems.cloud'))->readStream($file->name);
                fpassthru($stream);
            }, 200, [
                'Content-Type' => 'application/gzip',
                'Content-Disposition' => 'attachment; filename="' . $file->original_name . '"',
                'Content-Length' => $file->size
            ]);
        }
    }
}
