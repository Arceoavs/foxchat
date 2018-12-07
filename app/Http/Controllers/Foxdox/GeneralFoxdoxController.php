<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;


class GeneralFoxdoxController extends Controller
{
    /**
     * Create a new GeneralFoxdoxController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->validateUserAsUser();
        $this->middleware('auth:api');
    }

    public function validateUserAsUser()
    {
        if(auth()->user()->isProvider==0){
            return true;
        }else{
            throw new ChatAuthException("You are not a Foxdox User.");
        }
    }

    public function listProviders()
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/provider/listproviders', []);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }
}
