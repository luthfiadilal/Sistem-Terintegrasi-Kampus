<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KomponenPembayaran;

class KomponenPembayaranController extends Controller
{

    public function index()
    {
        $komponen = KomponenPembayaran::with('semester')->get();

        return Inertia::render('HomeDosen', [
            'komponenList' => $komponen
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'semester_id' => 'required|exists:semester,id'
        ]);

        $komponen = KomponenPembayaran::create([
            'nama' => $validated['nama'],
            'harga' => $validated['harga'],
        ]);

        $komponen->semester()->attach($validated['semester_id']);

        return redirect()->back()->with('success', 'Komponen pembayaran berhasil ditambahkan.');
    }
}
