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
     */
    public function handle()
    {
        $appId = $this->argument('id');

        $application = App::find($appId);

        if ( $application && !empty($application->db_database) && !empty($application->db_username) ) {

            //$cmd ='mysqldump -u'.$application->db_username.' -p'.$application->db_password.' '.$application->db_database.' --routines  > '.$application->backup->backup_path.'\backup_'.date('d-m-Y').'.sql';
            //$process = new Process($cmd);

            $date = date('d-m-Y Hi');

            $process = new Process('mysqldump -u'.$application->db_username.' -p'.$application->db_password.' --routines '.$application->db_database.' | gzip -c | cat > '.$application->backup_path.'/backup_'.$date.'.sql.gz');
            $process->run();

            History::create(['log_type' => 'backup', 'response' => 'New backup created: backup_'.$date.'.sql.gz']);

        } else {
            throw new \Exception('Invalid application (id:'.$appId.') or database connection');
        }
    }
}
