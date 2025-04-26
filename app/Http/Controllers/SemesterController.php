<?php

namespace App\Http\Controllers;

use App\Models\Semester;
use Illuminate\Http\Request;

class SemesterController extends Controller
{
    public function index()
    {
        return Semester::all();
    }

    public function setActive($id)
    {
        // Nonaktifkan semua semester
        Semester::query()->update(['status' => false]);

        // Aktifkan semester yang dipilih
        $semester = Semester::findOrFail($id);
        $semester->update(['status' => true]);

        return redirect()->back()->with('success', 'Semester aktif berhasil diperbarui.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'periode_mulai' => 'required|date',
            'periode_selesai' => 'required|date|after_or_equal:periode_mulai',
            'status' => 'boolean',
        ]);

        $semester = Semester::create($request->all());

        return response()->json($semester, 201);
    }

    public function show($id)
    {
        return Semester::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $semester = Semester::findOrFail($id);

        $request->validate([
            'nama' => 'string|max:255',
            'periode_mulai' => 'date',
            'periode_selesai' => 'date|after_or_equal:periode_mulai',
            'status' => 'boolean',
        ]);

        $semester->update($request->all());

        return response()->json($semester);
    }

    public function destroy($id)
    {
        $semester = Semester::findOrFail($id);
        $semester->delete();

        return response()->json(null, 204);
    }
}
