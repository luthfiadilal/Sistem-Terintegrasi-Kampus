<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Dosen;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;


class LoginDosenController extends Controller
{
    public function create()
    {
        return Inertia::render('LoginPageDosen');
    }

    /**
     * Proses login dosen.
     */
    public function store(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (!Auth::guard('dosen')->attempt($credentials)) {
        throw ValidationException::withMessages([
            'email' => __('Email atau password salah.'),
        ]);
    }

    $request->session()->regenerate();

    return redirect()->route('homedosen'); // sesuaikan route tujuan
}

public function destroy(Request $request)
{
    Auth::guard('dosen')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();
    $request->session()->forget('url.intended');

    return redirect(route('logindosen'));
}

}
