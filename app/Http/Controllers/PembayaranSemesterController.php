<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PembayaranSemester;
use App\Models\Semester;
use App\Models\KomponenPembayaran;

class PembayaranSemesterController extends Controller
{
    public function bayar(Request $request)
    {
        $request->validate([
            'semester_id' => 'required|exists:semester,id',
            'komponen_pembayaran_id' => 'required|exists:komponen_pembayarans,id',
        ]);

        $semester = Semester::with('komponenPembayaran')->findOrFail($request->semester_id);
        $komponen = KomponenPembayaran::findOrFail($request->komponen_pembayaran_id);

        // Pastikan komponen ini bagian dari semester yang dipilih
        if (!$semester->komponenPembayaran->contains('id', $komponen->id)) {
            return back()->withErrors([
                'komponen_pembayaran_id' => 'Komponen tidak valid untuk semester ini.',
            ]);
        }

        PembayaranSemester::updateOrCreate(
            [
                'mahasiswa_id' => auth('web')->id(),
                'semester_id' => $semester->id,
                'komponen_pembayaran_id' => $komponen->id,
            ],
            [
                'status' => 'dibayar',
                'tanggal_bayar' => now(),
                'jumlah_bayar' => $komponen->harga,
            ]
        );

        return back()->with('success', 'Pembayaran berhasil!');
    }

    public function tagihan($semesterId)
    {
        $semester = Semester::with('komponenPembayaran')->findOrFail($semesterId);
        $komponen = $semester->komponenPembayaran;

        $total = $komponen->sum('harga');

        return inertia('Pembayaran/Tagihan', [
            'semester' => $semester,
            'komponen' => $komponen,
            'total' => $total,
        ]);
    }
}

