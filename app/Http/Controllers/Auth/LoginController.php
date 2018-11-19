<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use GuzzleHttp\Client;
use \Illuminate\Http\Response as HTTPSTATUSCODES;
use \App\User;
use \Illuminate\Http\Request;
use App\Http\Controllers\FoxdoxApiClient;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    //protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function login(Request $request)
    {

        $name = $request['name'];
        $password = $request['password'];

        $body = [
            'username' => $name,
            'password' => $password,
        ];
        // Unser Foxdox-Api-Client
        $client = new FoxdoxApiClient('https://api.foxdox.de/auth/requesttoken', $body);

        $response = $client->loginRequest();

        $token = (json_decode($response->getBody())->Token);


        if($response->getStatusCode() == HTTPSTATUSCODES::HTTP_OK){
                   User::updateOrCreate(
                       ['name' => $name],
                       ['foxdox-token' => $token]
                   );
                   # session(['foxdoxUsername' => $name]);
               }

        return $response = [
            'username' => $name,
            'status' => $response->getStatusCode()
        ];

        // // TEST
        // $client2 = new FoxdoxApiClient('https://api.foxdox.de/document/listalldocs', []);
        // $response2 = $client2->apiRequest($name);

        // print_r((json_decode($response2->getBody())));
        
        // return view('successlogin', ['name' => $name, 'foxtoken' => $token]);
              
          
    }

}