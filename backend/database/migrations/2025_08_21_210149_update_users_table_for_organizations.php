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
            // Add organization foreign key
            $table->foreignId('organization_id')->nullable()->constrained()->onDelete('set null');
            
            // Update role field to include new roles
            $table->enum('role', ['super_admin', 'org_admin', 'admin', 'contributor', 'user'])->default('user')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->dropColumn('organization_id');
            
            // Revert role field back to original
            $table->enum('role', ['admin', 'contributor', 'user'])->default('user')->change();
        });
    }
};
