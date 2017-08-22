<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBackupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('backups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('app_id')->unsigned()->index();
            $table->string('backup_path');
            $table->string('frequency',50);
            $table->timestamps();

            $table->foreign('app_id')->references('id')->on('apps')
                ->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('backups');
    }
}
