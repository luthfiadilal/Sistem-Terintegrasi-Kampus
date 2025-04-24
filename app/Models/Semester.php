<?php

namespace App\Models;

use App\Models\MataKuliah;
use App\Models\KomponenPembayaran;
use App\Models\PembayaranSemester;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $table = 'semester';


    protected $fillable = [
        'nama',
        'periode_mulai',
        'periode_selesai',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
        'periode_mulai' => 'date',
        'periode_selesai' => 'date',
    ];

    public function mataKuliah()
    {
        return $this->hasMany(MataKuliah::class);
    }

    public function pembayaranMahasiswa()
    {
        return $this->hasMany(PembayaranSemester::class);
    }

    public function komponenPembayaran()
    {
        return $this->belongsToMany(KomponenPembayaran::class, 'komponen_semester');
    }
}
