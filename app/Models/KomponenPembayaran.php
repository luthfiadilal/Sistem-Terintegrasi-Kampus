<?php

namespace App\Models;

use App\Models\Semester;
use App\Models\PembayaranSemester;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class KomponenPembayaran extends Model
{
    use HasFactory;

    protected $table = 'komponen_pembayaran';

    protected $fillable = ['nama', 'harga'];

    public function pembayaran()
    {
        return $this->hasMany(PembayaranSemester::class);
    }

    public function semester()
    {
        return $this->belongsToMany(Semester::class, 'komponen_semester');
    }
}
