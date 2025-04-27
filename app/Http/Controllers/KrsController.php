<?php

namespace App\Http\Controllers;

use App\Models\Krs;
use Inertia\Inertia;
use App\Models\Semester;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use App\Models\KomponenPembayaran;
use App\Models\PembayaranSemester;
use Illuminate\Support\Facades\Auth;

class KrsController extends Controller

{

    public function index()
{
    $mahasiswaId = Auth::id();
    $semesterId = 1; // nanti bisa diambil dari dropdown / semester aktif

    // Ambil semester dan komponen pembayarannya
    $semesters = Semester::with('komponenPembayaran')->findOrFail($semesterId);
    $komponenIds = $semesters->komponenPembayaran->pluck('id')->toArray();

    // Ambil semua komponen yang sudah dibayar
    $pembayaranIds = PembayaranSemester::where('mahasiswa_id', $mahasiswaId)
        ->where('semester_id', $semesterId)
        ->where('status', 'dibayar')
        ->pluck('komponen_pembayaran_id')
        ->toArray();

    // Cek apakah semua komponen sudah dibayar
    // $belumLunas = !$pembayaranIds || $pembayaranIds->status !== 'dibayar';

    $mataKuliah = MataKuliah::with('dosen')->get();
    $krsSaya = Krs::with('mataKuliah', 'mataKuliah.dosen')
        ->where('mahasiswa_id', $mahasiswaId)
        ->get();

    return Inertia::render('Krs', [
        'mataKuliah' => $mataKuliah,
        'krsSaya' => $krsSaya,
        'periodeKrsSelesai' => false,
        // 'belumLunas' => $belumLunas,
        'semesters' => Semester::all(),
    ]);

}

    public function store(Request $request)
{

    $request->validate([
        'mata_kuliah_id' => 'required|exists:mata_kuliah,id',
        'semester_id' => 'required|exists:semester,id',
    ]);

    $mahasiswaId = Auth::user()->id;
    $semesterId = $request->semester_id;


    Krs::create([
        'mahasiswa_id' => $mahasiswaId,
        'mata_kuliah_id' => $request->mata_kuliah_id,
        'status_acc' => 'pending',
        'semester_id' => $semesterId
    ]);



    return redirect()->back()->with('message', 'Berhasil mengontrak mata kuliah!');
}
}
