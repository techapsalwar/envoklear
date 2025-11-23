<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('summary');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->string('image_large')->nullable();
            $table->string('author');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->integer('views')->default(0);
            $table->integer('reading_time')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('status');
            $table->index('published_at');
        });

        try {
            DB::statement('ALTER TABLE blogs ADD FULLTEXT idx_fulltext (title, content)');
        } catch (\Exception $e) {
            // Fulltext might not be supported or fail in some environments
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
