<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, update existing document categories to match new system
        DB::table('documents')->whereNotIn('category', [
            'Computing', 'Engineering', 'Management', 'GeoSciences', 'Environmental'
        ])->update(['category' => 'Computing']); // Default to Computing for unmapped categories

        // Update existing user specializations  
        DB::table('users')->whereNotNull('specialization')
            ->whereNotIn('specialization', [
                'Computing', 'Engineering', 'Management', 'GeoSciences', 'Environmental'
            ])->update(['specialization' => 'Computing']); // Default to Computing

        // Now update the schema to use enum
        Schema::table('documents', function (Blueprint $table) {
            $table->enum('category', [
                'Computing',
                'Engineering', 
                'Management',
                'GeoSciences',
                'Environmental'
            ])->change();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->enum('specialization', [
                'Computing',
                'Engineering', 
                'Management',
                'GeoSciences',
                'Environmental'
            ])->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->string('category')->change();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('specialization')->nullable()->change();
        });
    }
};
