<?php

namespace App\Http\Controllers;

use App\Models\Krs;
use Inertia\Inertia;
use App\Models\Semester;
use App\Models\Mahasiswa;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use App\Models\KomponenPembayaran;
use App\Models\PembayaranSemester;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Support\Facades\Auth;

class PembayaranSemesterController extends Controller
{
    // Menampilkan halaman Tagihan dan KRS
    public function index(Request $request)
    {
        $mahasiswaId = Auth::id();
        $semesterId = $request->input('semester_id', 1);

        $semesters = Semester::with('komponenPembayaran')->get();

        $semuaKomponen = [];

        $dosenWali = Mahasiswa::with('waliDosen')->findOrFail($mahasiswaId)->waliDosen;

        foreach ($semesters as $semester) { // <- loop semester dulu
            foreach ($semester->komponenPembayaran as $komponen) { // baru loop komponen
                $pembayaran = PembayaranSemester::where('mahasiswa_id', $mahasiswaId)
                    ->where('semester_id', $semester->id)
                    ->where('komponen_pembayaran_id', $komponen->id)
                    ->first();

                $semuaKomponen[] = [
                    'id' => $komponen->id,
                    'nama' => $komponen->nama,
                    'harga' => $komponen->harga,
                    'semester_id' => $semester->id,
                    'status' => $pembayaran ? $pembayaran->status : 'belum_dibayar',
                    'tanggal_bayar' => $pembayaran ? $pembayaran->tanggal_bayar : null,
                ];
            }
        }


        return Inertia::render('Tagihan', [
            'komponen' => $semuaKomponen, // sekarang semua semester
            'semesters' => $semesters,
            'total' => 0, // bisa dihitung di frontend
            'selectedSemester' => $semesterId,
            'mahasiswaId' => $mahasiswaId,
            'dosenWali' => $dosenWali,
        ]);
    }



    // Menangani proses pembayaran jika diperlukan
    public function bayar(Request $request)
{
    $request->validate([
        'semester_id' => 'required|exists:semester,id',
    ]);

    $mahasiswaId = Auth::id();

    // Ambil semua komponen pembayaran di semester ini
    $semester = Semester::with('komponenPembayaran')->findOrFail($request->semester_id);

    foreach ($semester->komponenPembayaran as $komponen) {
        // Cek apakah sudah dibayar
        $existingPayment = PembayaranSemester::where('mahasiswa_id', $mahasiswaId)
            ->where('semester_id', $semester->id)
            ->where('komponen_pembayaran_id', $komponen->id)
            ->first();

        if (!$existingPayment) {
            // Kalau belum ada, buat pembayaran baru
            PembayaranSemester::create([
                'mahasiswa_id' => $mahasiswaId,
                'semester_id' => $semester->id,
                'komponen_pembayaran_id' => $komponen->id,
                'status' => 'dibayar',
                'tanggal_bayar' => now(),
                'jumlah_bayar' => $komponen->harga, // ambil dari harga komponen
            ]);
        }
    }

    return back()->with('success', 'Semua pembayaran berhasil dilakukan!');
}

public function generateLaporanPembayaran($semesterId)
{
    $mahasiswaId = Auth::id();

    // Ambil data mahasiswa dan dosen wali
    $mahasiswa = Mahasiswa::findOrFail($mahasiswaId);
    $semester = Semester::findOrFail($semesterId);
    $dosenWali = Dosen::findOrFail($mahasiswa->dosen_wali_id); // pastikan mahasiswa memiliki dosen wali

    // Ambil komponen pembayaran dan statusnya
    $komponenPembayaran = PembayaranSemester::with('komponenPembayaran')
        ->where('mahasiswa_id', $mahasiswaId)
        ->where('semester_id', $semesterId)
        ->get();

    // Hitung total pembayaran
    $totalPembayaran = $komponenPembayaran->sum('jumlah_bayar');

    // Data untuk PDF
    $data = [
        'mahasiswa' => $mahasiswa,
        'semester' => $semester,
        'dosenWali' => $dosenWali,
        'komponenPembayaran' => $komponenPembayaran,
        'totalPembayaran' => $totalPembayaran
    ];

    // Render view dan generate PDF
    $pdf = PDF::loadView('pdf.laporanPembayaran', $data);

    // Download PDF
    return $pdf->download("laporan_pembayaran_{$mahasiswa->nama}_semester_{$semester->tahun}.pdf");
}

}
