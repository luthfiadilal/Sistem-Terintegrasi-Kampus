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

class PembayaranSemesterController extends Controller
{
    // Menampilkan halaman Tagihan dan KRS
    public function index(Request $request)
    {
        $mahasiswaId = Auth::id();
        $semesterId = $request->input('semester_id', 1);

        $semesters = Semester::with('komponenPembayaran')->get();

        $semuaKomponen = [];

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
        ]);
    }



    // Menangani proses pembayaran jika diperlukan
    public function bayar(Request $request)
    {
        $request->validate([
            'semester_id' => 'required|exists:semester,id',
            'komponen_pembayaran_id' => 'required|exists:komponen_pembayarans,id',
        ]);

        // Proses pembayaran untuk semester dan komponen yang dipilih
        PembayaranSemester::updateOrCreate(
            [
                'mahasiswa_id' => Auth::id(),
                'semester_id' => $request->semester_id,
                'komponen_pembayaran_id' => $request->komponen_pembayaran_id,
            ],
            [
                'status' => 'dibayar',
                'tanggal_bayar' => now(),
                'jumlah_bayar' => $request->jumlah_bayar,  // Angka yang dibayar sesuai input
            ]
        );

        return back()->with('success', 'Pembayaran berhasil!');
    }
}
