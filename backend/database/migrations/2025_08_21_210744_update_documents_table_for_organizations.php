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
        Schema::table('documents', function (Blueprint $table) {
            // Add organization foreign key
            $table->foreignId('organization_id')->nullable()->constrained()->onDelete('set null');
            
            // Add approval tracking
            $table->boolean('auto_approved')->default(false);
            $table->text('approval_notes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->dropColumn(['organization_id', 'auto_approved', 'approval_notes']);
        });
    }
};
