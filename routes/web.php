<?php

use Inertia\Inertia;
use App\Models\Semester;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use App\Models\KomponenPembayaran;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\KrsController;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KrsDosenController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\LoginDosenController;
use App\Http\Controllers\MataKuliahController;
use App\Http\Controllers\RegisterDosenController;
use App\Http\Controllers\KomponenPembayaranController;
use App\Http\Controllers\PembayaranSemesterController;

Route::middleware(['auth:web,dosen'])->get('/', function () {
    if (Auth::guard('web')->check()) {
        $mahasiswa = Auth::guard('web')->user()->load(['waliDosen', 'krs.mataKuliah.dosen']);
        return Inertia::render('Home', [
            'mahasiswa' => $mahasiswa,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    if (Auth::guard('dosen')->check()) {
        $dosen = Auth::guard('dosen')->user();
        $matakuliah = $dosen->mataKuliah()->with('semester')->get();
        $semester = \App\Models\Semester::all();
        $komponenPembayaran = KomponenPembayaran::with('semester')->get();


        return Inertia::render('HomeDosen', [
            'dosen' => $dosen,
            'matakuliah' => $matakuliah,
            'semesters' => $semester,
            'komponenList' => $komponenPembayaran,
            'canLogin' => Route::has('logindosen'),
            'canRegister' => Route::has('registerdosen'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    return redirect()->route('login');
})->name('home');

// Route::get('/', function () {
//     if (Auth::guard('web')->check()) {
//         $mahasiswa = Auth::guard('web')->user()->load(['waliDosen', 'krs.mataKuliah.dosen']);
//         return Inertia::render('Home', [
//             'mahasiswa' => $mahasiswa,
//             'canLogin' => Route::has('login'),
//             'canRegister' => Route::has('register'),
//             'laravelVersion' => Application::VERSION,
//             'phpVersion' => PHP_VERSION,
//         ]);
//     }

//     if (Auth::guard('dosen')->check()) {
//         $dosen = Auth::guard('dosen')->user();
//         $matakuliah = $dosen->mataKuliah()->with('semester')->get();
//         $semester = Semester::all();

//         return Inertia::render('HomeDosen', [ // Pastikan Pages/HomeDosen.jsx ada
//             'dosen' => $dosen,
//             'matakuliah' => $matakuliah,
//             'semesters' => $semester,
//             'canLogin' => Route::has('logindosen'),
//             'canRegister' => Route::has('registerdosen'),
//             'laravelVersion' => Application::VERSION,
//             'phpVersion' => PHP_VERSION,
//         ]);
//     }

//     // default: kalau gak login siapa-siapa
//     return redirect()->route('login');
// });



Route::get('/login', function () {
    return Inertia::render('LoginPage');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('RegisterPage');
})->name('register');

Route::get('/logindosen', [LoginDosenController::class, 'create'])->name('logindosen');
Route::post('/logindosen', [LoginDosenController::class, 'store']);
Route::post('/logoutdosen', [LoginDosenController::class, 'destroy'])->name('logoutdosen');


Route::get('/registerdosen', [RegisterDosenController::class, 'create'])->name('registerdosen');
Route::post('/registerdosen', [RegisterDosenController::class, 'store']);

Route::get('/akademik/krs', [KrsController::class, 'index'])->middleware(['auth'])->name('krs.index');
Route::post('/akademik/krs', [KrsController::class, 'store'])->middleware(['auth'])->name('krs.store');

Route::get('/akademik/krs-dosen', [KrsDosenController::class, 'index'])->middleware(['auth:dosen'])->name('krs.dosen.index');
Route::put('/akademik/krs-dosen/update-status/{id}', [KrsDosenController::class, 'updateStatus'])->name('krs.updateStatus');

Route::middleware(['auth:dosen'])->group(function () {
    Route::post('/matakuliah', [MataKuliahController::class, 'store'])->name('matakuliah.store');
});


Route::post('/komponen-pembayaran', [KomponenPembayaranController::class, 'store'])->name('komponen-pembayaran.store');

Route::put('/semester/{id}', [SemesterController::class, 'update']);

Route::get('/keuangan/history_pembayaran', [PembayaranSemesterController::class, 'index'])->name('keuangan.tagihan');
Route::post('/keuangan/history_pembayaran/bayar', [PembayaranSemesterController::class, 'bayar'])->name('pembayaran.bayar');




Route::get('/uploadimage', function () {
    return Inertia::render('UploadImage');
})->name('uploadimage');

Route::post('/upload-image', function (Request $request) {


    $file = $request->file('file');
    $ext = $file->getClientOriginalExtension();

    $path = Storage::putFileAs(
        'images',
        $request->file('file'),
        'logo.' . $ext
    );

    return $path;

})->name('upload-image');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
