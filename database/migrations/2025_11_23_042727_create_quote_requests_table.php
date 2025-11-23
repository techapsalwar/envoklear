<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 100);
            $table->string('phone', 20)->nullable();
            $table->string('whatsapp', 20);
            $table->string('company', 150)->nullable();
            $table->string('website')->nullable();
            $table->string('service_type', 100)->nullable();
            $table->text('requirements');
            $table->string('budget_range', 50)->nullable();
            $table->date('deadline');
            $table->enum('status', ['new', 'contacted', 'in_progress', 'quoted', 'won', 'lost'])->default('new');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->text('notes')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('source', 100)->default('website');
            $table->timestamps();
            
            $table->index('status');
            $table->index('email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quote_requests');
    }
};
