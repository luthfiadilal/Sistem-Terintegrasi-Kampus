<?php

namespace App\Models;

use App\Models\Semester;
use App\Models\Mahasiswa;
use App\Models\KomponenPembayaran;
use Illuminate\Database\Eloquent\Model;

class PembayaranSemester extends Model
{
    protected $table = 'pembayaran_semester';

    protected $fillable = [
        'mahasiswa_id',
        'semester_id',
        'status',
        'tanggal_bayar',
        'komponen_pembayaran_id',
        'jumlah_bayar'
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function komponen()
    {
        return $this->belongsTo(KomponenPembayaran::class, 'komponen_pembayaran_id');
    }
}
