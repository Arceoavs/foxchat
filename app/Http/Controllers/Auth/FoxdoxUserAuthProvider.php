<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use App\Http\Controllers\FoxdoxApiClient;
use Illuminate\Support\Facades\Log;
use \Illuminate\Http\Response as HTTPSTATUSCODES;
use Illuminate\Support\Str;
use \App\FoxdoxUser;

class FoxdoxUserAuthProvider extends EloquentUserProvider implements UserProvider
{
    protected $foxdoxapiclient;
    protected $response;
    public function retrieveByCredentials(array $credentials)
    {
        if($this->foxdoxapiclient === null){
            $this->createNewFoxdoxApiClient($credentials);
        }
        if($this->response->Status===HTTPSTATUSCODES::HTTP_OK){
            return FoxdoxUser::where('name', $credentials['name'])->first();
        }
    }

    public function createNewFoxdoxApiClient($credentials)
    {
        $name = $credentials['name'];
        $password = $credentials['password'];
        $body = [
            'username' => $name,
            'password' => $password,
        ];
        
        //Test, ob user credentials
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/auth/requesttoken', $body);
        $this->response = $foxdoxapiclient->loginRequest();
        $this->response=(json_decode($this->response->getBody()));
        $token = $this->response->Token;
        
        if($this->response->Status===HTTPSTATUSCODES::HTTP_OK){
            \App\FoxdoxUser::updateOrCreate(
                ['name' => $name],
                ['foxdox-token' => $token]
            );
        }
    }
    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
    public function validateCredentials(UserContract $user, array $credentials)
    {
        if($this->foxdoxapiclient === null){
            $this->createNewFoxdoxApiClient($credentials);
        }
        if($this->response->Status == HTTPSTATUSCODES::HTTP_OK){
            return true;
        }
        return false;
    }

}
