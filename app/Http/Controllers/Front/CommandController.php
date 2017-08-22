<?php

namespace App\Http\Controllers\Front;

use App\Models\Log;
use App\Models\App;
use App\Models\Command;
use Illuminate\Http\Request;
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
        Command::findOrFail($id)->delete();

        flash('Command deleted.');

        return redirect()->route('commands.index');
    }

    public function recipe($id)
    {
        $command = Command::findOrFail($id);

        Log::create([
            'log_type'   => 'command',
            'user_id'    => auth()->id(),
            'command_id' => $command->id
        ]);

        $commands = explode(PHP_EOL,$command->recipe);
        $task = implode(' && ', array_map('trim', $commands));

        if (empty($command->application->server_ip)) {
            $process = new Process($task);
        } else {
            $delimiter = 'EOF-APP';
            $process = new Process(
                "ssh -o StrictHostKeyChecking=no ".$command->application->server_ip." 'bash -se' << \\$delimiter".PHP_EOL
                .'set -e'.PHP_EOL
                .task.PHP_EOL
                .$delimiter
            );
        }

        $process->run();

        $responses = PHP_EOL . PHP_EOL .( !empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

        return response()->json(['data' => $responses]);
    }

    public function test($id)
    {
        $command = Command::findOrFail($id);

        $commands = explode(PHP_EOL,$command->recipe);
        $task = implode(' && ', array_map('trim', $commands));

        if (empty($command->application->server_ip)) {
            $process = new Process($task);
        } else {

            $delimiter = 'EOF-APP';
            $process = new Process(
                "ssh -o StrictHostKeyChecking=no ".$command->application->server_ip." 'bash -se' << \\$delimiter".PHP_EOL
                .'set -e'.PHP_EOL
                .task.PHP_EOL
                .$delimiter
            );
        }

        $process->run();

        $responses = PHP_EOL . PHP_EOL .( !empty($process->getErrorOutput()) ? $process->getErrorOutput() : $process->getOutput());

        print_r($responses);
        exit;
    }
}
