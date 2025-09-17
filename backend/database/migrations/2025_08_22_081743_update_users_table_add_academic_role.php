<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Update the role enum to include 'academic'
            $table->enum('role', ['user', 'contributor', 'admin', 'org_admin', 'super_admin', 'academic'])
                  ->default('user')
                  ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert the role enum to exclude 'academic'
            $table->enum('role', ['user', 'contributor', 'admin', 'org_admin', 'super_admin'])
                  ->default('user')
                  ->change();
        });
    }
};
