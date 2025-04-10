<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Mahasiswa extends Authenticatable
{

    protected $table = 'mahasiswa';


    protected $fillable = [
        'nim',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'alamat',
        'telepon',
        'email',
        'password',
        'wali_dosen_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relasi ke dosen (opsional)
    public function waliDosen()
    {
        return $this->belongsTo(Dosen::class, 'wali_dosen_id');
    }

    public function krs()
    {
        return $this->hasMany(Krs::class, 'mahasiswa_id');
    }
}
