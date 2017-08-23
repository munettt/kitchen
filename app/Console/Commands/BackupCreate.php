<?php

namespace App\Console\Commands;

use App\Models\App;
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

        $application = App::find($appId);

        if ( $application && !empty($application->db_name) && !empty($application->db_username) ) {

            //$cmd ='mysqldump -u'.$application->db_username.' -p'.$application->db_password.' '.$application->db_name.' --routines  > '.$application->backup->backup_path.'\backup_'.date('d-m-Y').'.sql';
            //$process = new Process($cmd);

            $date = date('d-m-Y-Hi');
            $filename = 'backup_'.$date.'.sql.gz';

            if (empty($application->ssh_ip))
            {
                $cmd = 'mysqldump -u'.$application->db_username.' -p'.$application->db_password.' --routines '.$application->db_name.' | gzip -c | cat > '.$application->backup->backup_path.'/'.$filename;

                $process = new Process($cmd);
                $process->run();
            }
            else
            {
                $key = new RSA();
                $key->loadKey($application->ssh_key);

                $ssh = new SSH2($application->ssh_ip);
                $ssh->setTimeout(0);

                if (!$ssh->login($application->ssh_user, $key)) {
                    throw new \Exception('Login Failed');
                }

                //task
                $task = 'mysqldump -u'.$application->db_username.' -p'.$application->db_password.' --routines '.$application->db_name.' | gzip -c | cat > '.$filename;
                $ssh->exec($task);

                //local process
                $process = new Process('scp '.$application->ssh_ip.':~/'.$filename.' '.$application->backup->backup_path.'/'.$filename);
                $process->run();

                //delete back
                $ssh->exec('rm '.$filename);
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
