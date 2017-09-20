<?php

namespace App\Console\Commands;

use App\Models\App;
use App\Models\Backup;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use App\Models\History;
use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class BackupClean extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:clean {id}';

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

        dd($backup->latestFile());


    }
}
