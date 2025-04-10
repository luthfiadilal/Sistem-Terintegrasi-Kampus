<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    use HasFactory;

    protected $table = 'mata_kuliah';

    protected $fillable = [
        'kode_mk',
        'nama_mk',
        'sks',
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
}
