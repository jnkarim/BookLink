<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->text('description')->nullable();
            $table->string('cover_image');
            $table->enum('status', ['pending', 'available', 'exchanged'])->default('pending')->change();
            $table->string('language');
            $table->enum('condition', ['new', 'old']);
            $table->string('genre');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
        
    }

    public function down() {
        Schema::dropIfExists('books');
    }
};
