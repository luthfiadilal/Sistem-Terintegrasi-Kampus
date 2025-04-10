<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class KrsDosenController extends Controller
{
    public function index()
{
    $dosenId = auth('dosen')->user()->id;

    // Mahasiswa yang memiliki dosen wali = dosen ini
    $mahasiswaBimbingan = Mahasiswa::where('wali_dosen_id', $dosenId)
        ->with(['krs.mataKuliah'])
        ->get();

    return Inertia::render('KrsDosen', [
        'mahasiswaBimbingan' => $mahasiswaBimbingan,
    ]);
}

    public function updateStatus(Request $request, $id) {

        Log::info('Update status KRS:', [
            'KRS ID' => $id,
            'Data request' => $request->all(),
        ]);

        $request->validate([
            'status_acc' => 'required|in:pending,disetujui,ditolak',
        ]);

        $krs = \App\Models\Krs::findOrFail($id);

        $dosenId = auth('dosen')->user()->id;
        $mahasiswa = \App\Models\Mahasiswa::where('wali_dosen_id', $dosenId)
            ->where('id', $krs->mahasiswa_id)
            ->first();

        if (!$mahasiswa) {
            abort(403, 'Bukan mahasiswa bimbingan Anda');
        }

        $updated = $krs->update([
            'status_acc' => $request->status_acc
        ]);

        Log::info('Berhasil update?', ['updated' => $updated]);

        return redirect()->back()->with('success', 'Status KRS berhasil diperbarui.');

    }

}
