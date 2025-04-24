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
        Schema::table('pembayaran_semester', function (Blueprint $table) {
            $table->foreignId('komponen_pembayaran_id')
            ->references('id')
            ->on('komponen_pembayaran')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pembayaran_semester', function (Blueprint $table) {
            $table->dropForeign(['komponen_pembayaran_id']);
            $table->dropColumn('komponen_pembayaran_id');
        });
    }
};
