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
            $table->string('cover_image'); // Store image path
            $table->enum('status', ['pending', 'available', 'borrowed', 'exchanging', 'given'])->default('pending');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('language', ['English', 'Bangla'])->default('English');
            $table->enum('condition', ['new', 'old'])->default('new'); // Instead of 'status'
            $table->timestamps(); // Keep timestamps at the end
        });
    }

    public function down() {
        Schema::dropIfExists('books');
    }
};
