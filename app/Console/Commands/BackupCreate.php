<?php

namespace App\Console\Commands;

use App\Models\App;
use App\Models\Backup;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use App\Models\History;
use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class BackupCreate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:create {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create backup';

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
        $appId = $this->argument('id');

        $application = App::findOrFail($appId);

        if ( empty($application->backup) ) {
            throw new \Exception('Application doesn\'t have any backup configured.');
        }

        if ( $application && !empty($application->db_name) && !empty($application->db_username) ) {

            //$cmd ='mysqldump -u'.$application->db_username.' -p'.$application->db_password.' '.$application->db_name.' --routines  > '.$application->backup->backup_path.'\backup_'.date('d-m-Y').'.sql';
            //$process = new Process($cmd);

            $date       = date('d-m-Y-Hi');
            $filename   = $application->db_name.'_'.$date.'.sql.gz';
            $folder     = $application->backup->location == 'cloud' ? storage_path('app/dbbackup') : $application->backup->backup_path;

            if ( $application->backup->location == 'cloud' && ! is_dir(storage_path('app/dbbackup'))) {
                Storage::disk('local')->makeDirectory('dbbackup');
            }

            if (empty($application->ssh_ip)) {

                $cmd = 'mysqldump -h'.$application->db_host.' -u'.$application->db_username.' -p'.$application->db_password.' --routines '.$application->db_name.' | gzip -c | cat > '.$folder.'/'.$filename;

                $this->info('Creating backup '.$filename);

                $process = new Process($cmd);
                $process->run();

                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                $this->processNewBackup($application, $filename, $folder);

            }
            else
            {
                //backup
                $this->info('Creating backup '.$filename.' on '.$application->ssh_ip);

                $task = 'mysqldump -h'.$application->db_host.' -u'.$application->db_username.' -p'.$application->db_password.' --routines '.$application->db_name.' | gzip -c | cat > '.$filename;

                $process = new Process('ssh '.$application->ssh_ip." '".$task."'");
                $process->run();

                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                //local process
                $this->info('Copying back locally');
                $process = new Process('scp '.$application->ssh_ip.':~/'.$filename.' '.$folder.'/'.$filename);
                $process->run();

                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                $this->processNewBackup($application, $filename, $folder);

                //delete back
                $process = new Process('ssh '.$application->ssh_ip." 'rm -f ".$filename."'");
                $process->run();
                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                $this->info('All Done!');
            }

            //log
            History::create([
                                'log_type' => 'backup',
                                'commands'  => $task ?? $cmd,
                                'response' => 'New backup created: '.$filename
            ]);

            //finish
            $this->info('All Done!');

        } else {
            throw new \Exception('Invalid application (id:'.$appId.') or database connection');
        }
    }

    public function processNewBackup($application, $filename, $folder)
    {
        $size = filesize($folder.'/'.$filename);
        $filenameHashed = $filename;

        //move to cloud
        if ( $application->backup->location == 'cloud' ) {

            $filenameHashed = md5($filename).'.sql.gz';
            Storage::disk(config('filesystems.cloud'))->put($filenameHashed, fopen($folder.'/'.$filename,'r'));
            Storage::delete('dbbackup/'.$filename);
        }

        //create
        $file = File::create([
            'name'          => $filenameHashed,
            'original_name' => $filename,
            'size'          => $size
        ]);

        $application->backup->files()->save($file);
    }
}
