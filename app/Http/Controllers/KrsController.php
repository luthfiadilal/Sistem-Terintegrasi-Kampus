<?php

namespace App\Http\Controllers;

use App\Models\Krs;
use Inertia\Inertia;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KrsController extends Controller

{

    public function index()
{
        $mahasiswaId = Auth::id();
        $semesterId = 1; // Sementara hardcode, nanti bisa ambil dari dropdown atau data semester aktif

        // Cek apakah sudah membayar semester ini
        $pembayaran = PembayaranSemester::where('mahasiswa_id', $mahasiswaId)
            ->where('semester_id', $semesterId)
            ->first();

        if (!$pembayaran || $pembayaran->status !== 'dibayar') {
            return redirect()->back()->with('error', 'Kamu harus membayar terlebih dahulu untuk semester ini.');
        }

        // Jika sudah membayar, baru tampilkan halaman KRS
        $mataKuliah = MataKuliah::all();

        $krsSaya = Krs::with('mataKuliah', 'mataKuliah.dosen')
            ->where('mahasiswa_id', $mahasiswaId)
            ->get();

        return Inertia::render('Krs', [
            'mataKuliah' => $mataKuliah,
            'krsSaya' => $krsSaya,
            'periodeKrsSelesai' => false // Nanti bisa diatur lewat setting
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
