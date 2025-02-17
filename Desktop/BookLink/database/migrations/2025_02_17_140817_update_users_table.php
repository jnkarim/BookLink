<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add the address column to the users table
            $table->string('address')->nullable();  // Add your desired column
        });
    }
    
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Rollback the changes by removing the address column
            $table->dropColumn('address');
        });
    }
    
};


