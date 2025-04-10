<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Dosen;
use Inertia\Response;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('RegisterPage');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Mahasiswa::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $dosen = Dosen::inRandomOrder()->first();

        $user = Mahasiswa::create([
            'nim' => str_pad(mt_rand(1, 9999999999), 10, '0', STR_PAD_LEFT),
            'nama_lengkap' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'wali_dosen_id' => $dosen?->id,
        ]);

        event(new Registered($user));

        return redirect()->route('login');
    }
}
