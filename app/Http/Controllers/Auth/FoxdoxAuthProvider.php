<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use App\Http\Controllers\FoxdoxApiClient;
use \Illuminate\Http\Response as HTTPSTATUSCODES;
use Illuminate\Support\Str;
use App\User;

use Illuminate\Support\Facades\Log;

class FoxdoxAuthProvider implements UserProvider
{
    protected $model;
    protected $foxdoxapiclient;
    protected $response;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function retrieveByCredentials(array $credentials)
    {
        if($this->foxdoxapiclient === null){
            $this->createNewFoxdoxApiClient($credentials);
        }
        if($this->response->Status===HTTPSTATUSCODES::HTTP_OK){
            return User::where('name', $credentials['name'])->first();
        }
    }

    public function createNewFoxdoxApiClient($credentials)
    {
        
        if(array_key_exists('x-provider', $credentials)){
            $name = $credentials['name'];
            $password = $credentials['password'];
            $xprovider = $credentials['x-provider'];
            $body = [
                'username' => $name,
                'password' => $password,
            ];
            Log::info('provider');
            
            //Test, ob user credentials
            $foxdoxapiclient = new FoxdoxApiClient('https://papi.foxdox.de/auth/requesttoken', $body);
            $foxdoxapiclient->setHeader('X-PROVIDER',$xprovider);
            $this->response = $foxdoxapiclient->loginRequest();
            $this->response=(json_decode($this->response->getBody()));
            $token = $this->response->Token;
            
            if($this->response->Status===HTTPSTATUSCODES::HTTP_OK){
                User::updateOrCreate(
                    ['name' => $name],
                    ['foxdox-token' => $token,
                     'isProvider' => true]
                );
            }
        }else {
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
                User::updateOrCreate(
                    ['name' => $name],
                    ['foxdox-token' => $token,
                     'isProvider' => false]
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
        if($this->foxdoxapiclient === null){
            $this->createNewFoxdoxApiClient($credentials);
        }
        if($this->response->Status == HTTPSTATUSCODES::HTTP_OK){
            return true;
        }
        return false;
    }

    /**
     * Retrieve a user by their unique identifier.
     *
     * @param  mixed  $identifier
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveById($identifier)
    {
        // $model = $this->createModel();

        // return $model->newQuery()
        //     ->where($model->getAuthIdentifierName(), $identifier)
        //     ->first();
    }

    /**
     * Retrieve a user by their unique identifier and "remember me" token.
     *
     * @param  mixed   $identifier
     * @param  string  $token
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByToken($identifier, $token)
    {
        // $model = $this->createModel();

        // $model = $model->where($model->getAuthIdentifierName(), $identifier)->first();

        // if (! $model) {
        //     return null;
        // }

        // $rememberToken = $model->getRememberToken();

        // return $rememberToken && hash_equals($rememberToken, $token) ? $model : null;
    }

        /**
     * Update the "remember me" token for the given user in storage.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  string  $token
     * @return void
     */
    public function updateRememberToken(UserContract $user, $token)
    {
        // $user->setRememberToken($token);

        // $timestamps = $user->timestamps;

        // $user->timestamps = false;

        // $user->save();

        // $user->timestamps = $timestamps;
    }

}
