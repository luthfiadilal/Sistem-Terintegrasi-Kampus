<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Dosen;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisterDosenController extends Controller
{
    public function create () : Response {
        return Inertia::render('RegisterPageDosen');
    }

    public function store (Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Dosen::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Dosen::create([
            'nidn' => str_pad(mt_rand(1, 9999999999), 10, '0', STR_PAD_LEFT),
            'nama_lengkap' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('home', absolute: false));
    }
}
