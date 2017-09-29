<?php

namespace App\Http\Controllers\Front;

use App\Models\Log;
use App\Models\App;
use App\Models\Command;
use Illuminate\Http\Request;
use phpseclib\Crypt\RSA;
use phpseclib\Net\SSH2;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class CommandController extends BaseController
{
    public function __construct()
    {
        parent::__construct();

        view()->share('title', 'Commands');
        view()->share('nav', 'commands');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->hasPermission('read-commands');

        $commands = Command::with('application')->paginate(30);

        return view('front.commands.index',compact('commands'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->hasPermission('create-commands');

        $apps = App::all()->pluck('domain','id');

        return view('front.commands.create',compact('apps'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->hasPermission('create-commands');

        Command::create($request->all());

        flash('Command created.');

        return redirect()->route('commands.index');
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
        $this->hasPermission('update-commands');

        $command = Command::with('application')->findOrFail($id);
        $apps = App::all()->pluck('domain','id');

        return view('front.commands.edit',compact('command','apps'));
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
        $this->hasPermission('update-commands');

        $command = Command::findOrFail($id);

        $command->update($request->all());

        flash('Command updated.');

        return redirect()->route('commands.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->hasPermission('delete-commands');

        Command::findOrFail($id)->delete();

        flash('Command deleted.');

        return redirect()->route('commands.index');
    }

    /**
     * Get recipe of a command
     */
    public function recipe($id)
    {
        $this->hasPermission('read-commands');

        $command = Command::findOrFail($id);

        return response()->json(['data' => $command]);
    }

    /**
     * Execute task
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function exec($id)
    {
        $this->hasPermission('read-commands');

        $command = Command::findOrFail($id);

        echo "<style type='text/css'>body { padding:0; font-family:'SFMono-Regular', Menlo, Monaco, Consolas, monospace; background:#444; color:#fff; font-size:0.8rem; } </style>";

        Log::create([
            'log_type'   => 'command',
            'user_id'    => auth()->id(),
            'command_id' => $command->id
        ]);

        $commands = explode(PHP_EOL,$command->recipe);
        $task = implode(' && ', array_map('trim', $commands));
        $task = preg_replace(['~(?<!\s)\h*\R\h*+(?!\s)~', '~\h*(\R)\h*+\s+~'], [' ', '$1'], $task);

        if (empty($command->application->ssh_ip))
        {
            $process = new Process($task);
            $process->setTimeout(3600);
            //$process->run();

            function ($type, $buffer) {
               nl2br( $buffer );
            }

            // executes after the command finishes
            /*if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }*/


            if ( !empty($process->getErrorOutput())) {
                echo 'ERROR:';
                echo nl2br($process->getErrorOutput());
            }

            //echo nl2br( $process->getOutput() );
        }
        else
        {
            $key = new RSA();
            $key->loadKey($command->application->ssh_key);

            $ssh = new SSH2($command->application->ssh_ip);
            if (!$ssh->login($command->application->ssh_user, $key)) {
                throw new \Exception('Login Failed');
            }

            $ssh->setTimeout(0);
            echo nl2br($ssh->exec($task));
        }

        //return response()->json(['data' => $responses]);
    }
}
