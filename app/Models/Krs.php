<?php

namespace App\Models;

use App\Models\Semester;
use App\Models\Mahasiswa;
use App\Models\MataKuliah;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Krs extends Model
{
    use HasFactory;

    protected $table = 'krs';

    public $timestamps = false; // <--- tambahkan ini

    protected $fillable = [
        'mahasiswa_id',
        'mata_kuliah_id',
        'status_acc',
        'semester_id',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class);
    }

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
