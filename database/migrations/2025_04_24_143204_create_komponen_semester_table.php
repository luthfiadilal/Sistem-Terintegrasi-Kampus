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
        Schema::create('komponen_semester', function (Blueprint $table) {
            $table->id();
            $table->foreignId('semester_id')->references('id')->on('semester')->onDelete('cascade');
            $table->foreignId('komponen_pembayaran_id')->references('id')->on('komponen_pembayaran')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komponen_semester');
    }
};
