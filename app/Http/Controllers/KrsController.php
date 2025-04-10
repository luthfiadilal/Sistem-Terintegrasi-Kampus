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
        $mataKuliah = MataKuliah::all();
        $mahasiswaId = Auth::id();

        $krsSaya = Krs::with('mataKuliah', 'mataKuliah.dosen') // Pastikan relasi ke dosen dibuat
            ->where('mahasiswa_id', $mahasiswaId)
            ->get();

        return Inertia::render('Krs', [
            'mataKuliah' => $mataKuliah,
            'krsSaya' => $krsSaya,
            'periodeKrsSelesai' => false // sementara hardcoded, nanti bisa pakai model Setting
        ]);
}

    public function store(Request $request)
{
    $request->validate([
        'mata_kuliah_id' => 'required|exists:mata_kuliah,id',
    ]);

    $mahasiswaId = Auth::user()->id;

    Krs::create([
        'mahasiswa_id' => $mahasiswaId,
        'mata_kuliah_id' => $request->mata_kuliah_id,
        'status_acc' => 'pending', // default belum di-acc
    ]);

    return redirect()->back()->with('message', 'Berhasil mengontrak mata kuliah!');
}
}
