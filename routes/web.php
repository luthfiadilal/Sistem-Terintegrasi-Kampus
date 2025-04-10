<?php

use Inertia\Inertia;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\KrsController;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KrsDosenController;
use App\Http\Controllers\LoginDosenController;
use App\Http\Controllers\RegisterDosenController;

Route::get('/', function () {
    $mahasiswa = Auth::user()->load(['waliDosen', 'krs.mataKuliah.dosen']);


    return Inertia::render('Home', [
        'mahasiswa' => $mahasiswa,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::get('/homedosen', function () {
    $mahasiswa = Mahasiswa::with('waliDosen')->get();

    return Inertia::render('Home', [
        'mahasiswa' => $mahasiswa,
        'canLogin' => Route::has('logindosen'),
        'canRegister' => Route::has('registerdosen'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);

})->middleware(['auth:dosen', 'verified'])->name('homedosen');

Route::get('/login', function () {
    return Inertia::render('LoginPage');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('RegisterPage');
})->name('register');

Route::get('/logindosen', [LoginDosenController::class, 'create'])->name('logindosen');
Route::post('/logindosen', [LoginDosenController::class, 'store']);
Route::get('/logoutdosen', [LoginDosenController::class, 'destroy'])->name('logoutdosen');


Route::get('/registerdosen', [RegisterDosenController::class, 'create'])->name('registerdosen');
Route::post('/registerdosen', [RegisterDosenController::class, 'store']);

Route::get('/akademik/krs', [KrsController::class, 'index'])->middleware(['auth'])->name('krs.index');
Route::post('/akademik/krs', [KrsController::class, 'store'])->middleware(['auth'])->name('krs.store');

Route::get('/akademik/krs-dosen', [KrsDosenController::class, 'index'])->middleware(['auth:dosen'])->name('krs.dosen.index');
Route::put('/akademik/krs-dosen/update-status/{id}', [KrsDosenController::class, 'updateStatus'])->name('krs.updateStatus');

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
