<?php

namespace App\Console\Commands;

use App\Models\App;
use phpseclib\Net\SSH2;
use App\Models\History;
use phpseclib\Crypt\RSA;
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

        $application = App::find($appId);

        if ( $application && !empty($application->db_name) && !empty($application->db_username) ) {

            //$cmd ='mysqldump -u'.$application->db_username.' -p'.$application->db_password.' '.$application->db_name.' --routines  > '.$application->backup->backup_path.'\backup_'.date('d-m-Y').'.sql';
            //$process = new Process($cmd);

            $date = date('d-m-Y-Hi');
            $filename = 'backup_'.$date.'.sql.gz';

            if (empty($application->ssh_ip))
            {
                $cmd = 'mysqldump -u'.$application->db_username.' -p'.$application->db_password.' --routines '.$application->db_name.' | gzip -c | cat > '.$application->backup->backup_path.'/'.$filename;

                $this->info('Creating backup '.$filename);

                $process = new Process($cmd);
                $process->run();

                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                $this->info('All Done!');
            }
            else
            {
                //backup
                $this->info('Creating backup '.$filename.' on '.$application->ssh_ip);

                $task = 'mysqldump -u'.$application->db_username.' -p'.$application->db_password.' --routines '.$application->db_name.' | gzip -c | cat > '.$filename;

                $process = new Process('ssh '.$application->ssh_ip." '".$task."'");
                $process->run();

                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                //local process
                $this->info('Copying back locally');
                $process = new Process('scp '.$application->ssh_ip.':~/'.$filename.' '.$application->backup->backup_path.'/'.$filename);
                $process->run();

                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                //delete back
                $process = new Process('ssh '.$application->ssh_ip." 'rm -f ".$filename."'");
                $process->run();
                $this->info(!empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

                $this->info('All Done!');

            }

            History::create([
                                'log_type' => 'backup',
                                'commands'  => $task ?? $cmd,
                                'response' => 'New backup created: backup_'.$date.'.sql.gz'
            ]);

        } else {
            throw new \Exception('Invalid application (id:'.$appId.') or database connection');
        }
    }
}
