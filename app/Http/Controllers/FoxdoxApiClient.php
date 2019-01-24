<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use \App\User;

use Illuminate\Support\Facades\Log;

/**
 * 
 * A client for communication with the foxdox-api
 * Contains methods for sending api-requests to any given URL with given parameters for HTML headers and body.
 * When login in the first time the loginRequest() method will be used as it does not need a Valid Foxdox-Token.
 * 
 */

class FoxdoxApiClient extends Controller
{

    protected $client;

    protected $method;
    protected $url;
    protected $headers;
    protected $body;
    protected $token;

    /**
     * Constructs a new GuzzleHttp Client and initializes the required variables
     * 
     * @param string $url URL that the request will be sent to
     * @param array $body parameters for the HTTP body of the request
     */
    public function __construct(string $url, array $body)
    {
        $this->client = new Client();
        $this->method = 'POST';
        $this->url = $url;
        $this->headers =
            [
            'X-DEVID' => 'KbYjzdwUSqmNU84nNek2',
            'X-APPID' => 'chXhweSqLsyUdAyZVz9a',
            'X-LANG' => 'de',
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];
        $this->body = $body;
    }

    /**
     * Gives the ability to set a Custom Header. 
     * @param string $index takes the name as a String the
     * @param string $value will be placed under
     */

    public function setHeader(string $index, string $value)
    {
        $this->headers[$index] = $value;
    }

    /**
     * Gives the ability to replace the complete Header Array
     * @param array ($newHeaders) 
     * 
     */

    public function setHeaders(array $newHeaders)
    {
        $this->headers = $newHeaders;
    }

    /**
     * This method is once called to request the Token by the FoxdoxApi.
     * @return Response Object with the Information of sent by Foxdox 
     */

    public function loginRequest()
    {
        $response = $this->client->request('POST', $this->url, [
            'json' => $this->body,
            'headers' => $this->headers
        ]);
        return $response;

    }
    /**
     * Gives the ability to change the standard method from 'POST' to another HTTP method.
     */

    public function setMethod($method)
    {
        $this->method = $method;
    }

    /**
     * This method can be use by for any other ApiRquest sent to FoxdoxApiClient.
     * Takes the
     * @param string $foxdoxUserName the API request should be done with.
     * @return Response $response Object with the Information of sent by Foxdox
     */
    public function apiRequest(string $foxdoxUsername)
    {
        $user = User::where('name', $foxdoxUsername);

        $token = $user->pluck('foxdox-token')->first();
        $xProvider = $user->pluck('x-provider')->first();

        $this->setHeader('X-TOKEN', $token);
        $this->setHeader('X-PROVIDER', $xProvider);

        $response = $this->client->request(
            $this->method,
            $this->url,
            [
                'form_params' => $this->body,
                'headers' => $this->headers,
            ]
        );
        return $response;
    }
}
