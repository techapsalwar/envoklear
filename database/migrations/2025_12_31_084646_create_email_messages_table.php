<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('email_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quote_request_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('direction', ['inbound', 'outbound'])->default('outbound');
            $table->string('from_email');
            $table->string('from_name')->nullable();
            $table->string('to_email');
            $table->string('subject');
            $table->longText('body_html')->nullable();
            $table->longText('body_text')->nullable();
            $table->string('resend_message_id')->nullable();
            $table->string('in_reply_to')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            $table->index('quote_request_id');
            $table->index('from_email');
            $table->index('direction');
            $table->index('is_read');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('email_messages');
    }
};
