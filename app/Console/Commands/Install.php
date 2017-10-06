<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class Install extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kitchen:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install kitchen';

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
        //ask publish files? (recommended on fresh install)
        if ( !$this->confirm("Shall we begin?")) {
            $this->info('Maybe next time :)');
            return;
        }

        $this->call('migrate');

        //db seed
        $this->call('db:seed');

        //ask create user?
        $user = new User;

        //ask important questions
        $this->info('Creating default admin user');
        $user->name = $this->ask('Full name?');
        $user->email = $this->ask('Email?');
        $user->password = Hash::make($this->secret('Password?'));
        $user->save();

        $this->info("User created (id: {$user->id})");

        //role
        $user->roles()->attach(1);
        $user->save();


        $this->info('All done!');
    }
}
