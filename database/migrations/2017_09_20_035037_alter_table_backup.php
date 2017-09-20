<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableBackup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('backups', function (Blueprint $table) {
            $table->dropColumn('frequency');
            $table->string('location',32)->default('local');
            $table->string('backup_url')->nullable()->change();
            $table->string('backup_path')->nullable()->change();
            $table->smallInteger('cleanup_all')->unsigned();
            $table->smallInteger('cleanup_daily')->unsigned();
            $table->smallInteger('cleanup_week')->unsigned();
            $table->smallInteger('cleanup_month')->unsigned();
            $table->smallInteger('cleanup_year')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('backups', function (Blueprint $table) {
            //
        });
    }
}
