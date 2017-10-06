<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Backup;
use Illuminate\Console\Command;
use App\Models\File as FileModel;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BackupClean extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kitchen:backup-clean {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'clean backups';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        $id = $this->argument('id');

        $backup = Backup::findOrFail($id);

        $keep =  Carbon::now()->subDays($backup->keep)->toDateTimeString();

        $files = $backup->files()->where('files.created_at', '>', $keep)->get();
        $files->each(function($file) use ($backup)
        {
            if ( $backup->location == 'local' && File::exists($backup->backup_path.'/'.$file->name) ) {

                File::delete($backup->backup_path.'/'.$file->name);
            }
            else if ( $backup->location == 'cloud' && Storage::disk(config('filesystems.cloud'))->has($file->name) )
            {
                Storage::disk(config('filesystems.cloud'))->delete($file->name);
            }

            $file->delete();

            $this->line('Deleted: '.$file->name);
        });
    }
}
