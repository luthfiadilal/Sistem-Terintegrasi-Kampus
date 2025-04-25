<?php

namespace App\Http\Controllers;

use App\Models\Krs;
use Inertia\Inertia;
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
    $semester = \App\Models\Semester::with('komponenPembayaran')->findOrFail($semesterId);
    $komponenIds = $semester->komponenPembayaran->pluck('id')->toArray();

    // Ambil semua komponen yang sudah dibayar
    $pembayaranIds = PembayaranSemester::where('mahasiswa_id', $mahasiswaId)
        ->where('semester_id', $semesterId)
        ->where('status', 'dibayar')
        ->pluck('komponen_pembayaran_id')
        ->toArray();

    // Cek apakah semua komponen sudah dibayar
    $belumLunas = !$pembayaranIds || $pembayaranIds->status !== 'dibayar';

    $mataKuliah = MataKuliah::all();
    $krsSaya = Krs::with('mataKuliah', 'mataKuliah.dosen')
        ->where('mahasiswa_id', $mahasiswaId)
        ->get();

    return Inertia::render('Krs', [
        'mataKuliah' => $mataKuliah,
        'krsSaya' => $krsSaya,
        'periodeKrsSelesai' => false,
        'belumLunas' => $belumLunas,
    ]);

}

    public function store(Request $request)
{
    $request->validate([
        'mata_kuliah_id' => 'required|exists:mata_kuliah,id',
    ]);

    $mahasiswaId = Auth::user()->id;
    $semesterId = $request->semester_id;

    $pembayaranLengkap = KomponenPembayaran::all()->every(function ($komponen) use ($mahasiswaId, $semesterId) {
        return PembayaranSemester::where([
            'mahasiswa_id' => $mahasiswaId,
            'semester_id' => $semesterId,
            'komponen_pembayaran_id' => $komponen->id,
            'status' => 'dibayar',
            'semester_id' => $semesterId,
        ])->exists();
    });

    if (!$pembayaranLengkap) {
        return back()->with('error', 'Kamu belum menyelesaikan semua pembayaran semester ini.');
    }

    Krs::create([
        'mahasiswa_id' => $mahasiswaId,
        'mata_kuliah_id' => $request->mata_kuliah_id,
        'status_acc' => 'pending', // default belum di-acc
    ]);

    return redirect()->back()->with('message', 'Berhasil mengontrak mata kuliah!');
}
}
