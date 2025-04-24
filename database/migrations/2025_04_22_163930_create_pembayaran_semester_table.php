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
        Schema::create('pembayaran_semester', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mahasiswa_id')
            ->references('id')
            ->on('mahasiswa')
            ->onDelete('cascade');

            $table->foreignId('semester_id')
            ->references('id')
            ->on('semester')
            ->onDelete('cascade');

            $table->enum('status', ['belum_dibayar', 'dibayar'])->default('belum_dibayar');
            $table->timestamp('tanggal_bayar')->nullable();
            $table->timestamps();

            $table->unique(['mahasiswa_id', 'semester_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_semester');
    }
};
