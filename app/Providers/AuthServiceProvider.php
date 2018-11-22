<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Http\Controllers\Auth\FoxdoxUserAuthProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::provider('FoxdoxUserAuthProvider', function($app, array $config){
            return new FoxdoxUserAuthProvider($app['hash'], $config['model']);
        });
        Auth::provider('FoxdoxProviderAuthProvider', function($app, array $config){
            return new FoxdoxUserAuthProvider($app['hash'], $config['model']);
        });

    }
}
