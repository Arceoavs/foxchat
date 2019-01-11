<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;
use App\Services\ChatAPIService;
use App\User;



class ProviderFoxdoxController extends Controller
{
    /**
     * Create a new ProviderFoxdoxController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->validateUserAsProvider();
        $this->middleware('auth:api');
    }


    public function validateUserAsProvider()
    {
        if (auth()->check()) {
            if (auth()->user()->isProvider == 1) {
                return true;
            } else {
                throw new ChatAuthException("You are not a Foxdox Provider.");
            }
        }
    }




}
