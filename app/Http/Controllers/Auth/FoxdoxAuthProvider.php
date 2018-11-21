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
use \App\User;

class FoxdoxAuthProvider extends EloquentUserProvider implements UserProvider
{
    protected $foxdoxapiclient;
    protected $response;
    public function retrieveByCredentials(array $credentials)
    {
        if($this->foxdoxapiclient === null){
            $this->createNewFoxdoxApiClient($credentials);
        }
        //Laravel native code

        if (empty($credentials) ||
            (count($credentials) === 1 &&
            array_key_exists('password', $credentials))) {
            return;
        }
        // First we will add each credential element to the query as a where clause.
        // Then we can execute the query and, if we found a user, return it in a
        // Eloquent User "model" that will be utilized by the Guard instances.
        $query = $this->createModel()->newQuery();

        foreach ($credentials as $key => $value) {
            if($key != 'password'){
                if (Str::contains($key, 'name')) {
                    continue;
                }

                if (is_array($value) || $value instanceof Arrayable) {
                    $query->whereIn($key, $value);
                } else {
                    $query->where($key, $value);
                }
            }
        }

        return $query->first();
    }

    public function createNewFoxdoxApiClient($credentials)
    {
        $name = $credentials['name'];
        $password = $credentials['password'];
        $body = [
            'username' => $name,
            'password' => $password,
        ];
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/auth/requesttoken', $body);
        $this->response = $foxdoxapiclient->loginRequest();
        $token = (json_decode($this->response->getBody())->Token);
        User::updateOrCreate(
            ['name' => $name],
            ['foxdox-token' => $token]
        );
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
        if($this->response->getStatusCode() == HTTPSTATUSCODES::HTTP_OK){
            return true;
        }
        return false;
    }

}
