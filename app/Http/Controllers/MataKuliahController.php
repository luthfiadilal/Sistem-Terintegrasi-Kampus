<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MataKuliah;
use App\Models\Semester;

class MataKuliahController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:dosen');
    }

    public function index()
    {
        $dosen_id = auth('dosen')->id();
        $mataKuliah = MataKuliah::with('semester')
                        ->where('dosen_id', $dosen_id)
                        ->get();

        $semesters = Semester::all();

        return inertia('HomeDosen', [
            'matakuliah' => $mataKuliah,
            'semesters' => $semesters,
        ]);
    }



    public function store(Request $request)
    {
        $request->validate([
            'kode_mk' => 'required|string|max:20',
            'nama_mk' => 'required|string|max:255',
            'sks' => 'required|integer|min:1|max:6',
            'semester_id' => 'required|exists:semester,id',
        ]);

        // tangkap dosen id
        $dosen = auth('dosen')->user();


        MataKuliah::create([
            'kode_mk' => $request->kode_mk,
            'nama_mk' => $request->nama_mk,
            'sks' => $request->sks,
            'semester_id' => $request->semester_id,
            'dosen_id' => auth()->user()?->id ?? auth('dosen')->id(), // fallback ke user biasa
        ]);


        return redirect()->back()->with('success', 'Mata kuliah berhasil ditambahkan');
    }
}
