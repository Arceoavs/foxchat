<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use App\Http\Controllers\FoxdoxApiClient;
use \Illuminate\Http\Response as HTTPSTATUSCODES;
use Illuminate\Support\Str;
use App\User;

use Illuminate\Support\Facades\Log;

class FoxdoxAuthProvider extends EloquentUserProvider
{
    protected $foxdoxapiclient;
    protected $response;
    /**
     * Retrieve a user by their unique identifier and "remember me" token.
     *
     * @param  mixed   $identifier
     * @param  string  $token
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        if ($this->foxdoxapiclient === null) {
            $this->createNewFoxdoxApiClient($credentials);
        }
        if ($this->response->getStatusCode() === HTTPSTATUSCODES::HTTP_OK) {
            return User::where('name', $credentials['name'])->first();
        }
    }
    /**
     * This method initializes the FoxdoxApiClient, to check whether valid Foxdox Provider or
     * Client credentials where permitted.
     * If some vaiid Foxdox credentials were permitted a new Database entry will be done or an exisiting 
     * entry will be updated.
     */
    public function createNewFoxdoxApiClient($credentials)
    {
        if (array_key_exists('x-provider', $credentials)) {
            //Provider section
            $name = $credentials['name'];
            $password = $credentials['password'];
            $xprovider = $credentials['x-provider'];
            $body = [
                'username' => $name,
                'password' => $password,
            ];
            //Create an Foxdox API Client and request an Foxdox Token
            $foxdoxapiclient = new FoxdoxApiClient('https://mein.foxdox.de/identity/login', $body);
            //Set the special Header for Foxdox Provider requests "X-PROVIDER"
            $foxdoxapiclient->setHeader('X-PROVIDER', $xprovider);
            $this->response = $foxdoxapiclient->loginRequest();
            $token = json_decode($this->response->getBody())->token;
            
            //Check if response gives valid tokens
            if ($this->response->getStatusCode() === HTTPSTATUSCODES::HTTP_OK) {
                //The first array verfies the second array fill optional columns
                User::updateOrCreate(
                    ['name' => $name],
                    [
                        'foxdox-token' => $token,
                        'isProvider' => true,
                        'x-provider' => $xprovider
                    ]
                );
            }
        } else {
            //User section 
            $name = $credentials['name'];
            $password = $credentials['password'];
            $body = [
                'username' => $name,
                'password' => $password
            ];

            //Create an Foxdox API Client and request an Foxdox Token
            $foxdoxapiclient = new FoxdoxApiClient('https://mein.foxdox.de/identity/login', $body);
            $foxdoxapiclient->setHeader('Content-Type', 'application/json');
            $this->response = $foxdoxapiclient->loginRequest();
            $token = json_decode($this->response->getBody())->token;

            //Check if response gives valid tokens
            if ($this->response->getStatusCode() === HTTPSTATUSCODES::HTTP_OK) {
                //The first array verfies the second array fill optional columns
                User::updateOrCreate(
                    ['name' => $name],
                    [
                        'foxdox-token' => $token,
                        'isProvider' => false
                    ]
                );
            }
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
        if ($this->foxdoxapiclient === null) {
            $this->createNewFoxdoxApiClient($credentials);
        }
        if ($this->response->getStatusCode() == HTTPSTATUSCODES::HTTP_OK) {
            return true;
        }
        return false;
    }
}
