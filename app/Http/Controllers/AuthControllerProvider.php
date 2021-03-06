<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Validator;

use Illuminate\Support\Facades\Log;

/**
 * Here all requests from (auth/provider/login) arrives.
 */

class AuthControllerProvider extends Controller
{
         /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        //Check if provided requests contains the needed parameters
        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'password'=> 'required',
            'x-provider' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        //Try to login
        $credentials = request(['name', 'password', 'x-provider']);
        if (! $token = auth()->guard()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'isProvider' => auth()->user()->isProvider,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 24
        ]);
    }
}
