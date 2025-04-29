<?php

namespace App\Models;

use App\Models\Dosen;
use App\Models\Semester;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MataKuliah extends Model
{
    use HasFactory;

    protected $table = 'mata_kuliah';

    protected $fillable = [
        'kode_mk',
        'nama_mk',
        'sks',
        'semester_id',
        'dosen_id',
        'hari',
        'jam_mulai',
        'jam_selesai',
    ];

    // Relasi ke mahasiswa melalui KRS
    public function mahasiswa()
    {
        return $this->belongsToMany(Mahasiswa::class, 'krs')
                    ->withPivot('status_acc')
                    ->withTimestamps();
    }

    public function krs()
    {
        return $this->hasMany(KRS::class);
    }

    public function dosen()
    {
        return $this->belongsTo(Dosen::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
