<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Dosen extends Authenticatable
{
    use HasFactory;

    protected $table = 'dosen';

    protected $fillable = [
        'nidn',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'alamat',
        'telepon',
        'email',
        'password',
    ];

    protected $hidden = ['password'];

    // Relasi ke mahasiswa bimbingan
    public function mahasiswa()
    {
        return $this->hasMany(Mahasiswa::class, 'wali_dosen_id');
    }
}
