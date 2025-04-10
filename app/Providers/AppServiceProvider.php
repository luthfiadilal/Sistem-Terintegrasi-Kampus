<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share('auth', function () {
            $guards = ['web', 'dosen'];
            $activeGuard = null;
            $user = null;

            foreach ($guards as $guard) {
                if (Auth::guard($guard)->check()) {
                    $activeGuard = $guard;
                    $user = Auth::guard($guard)->user();
                    break;
                }
            }

            return [
                'user' => $user,
                'guard' => $activeGuard,
            ];
        });

    }

}
