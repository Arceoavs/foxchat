<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use \App\User;

/**
 * 
 * A client for communication with the foxdox-api
 * Contains methods for sending api-requests to any given URL with given parameters for HTML headers and body
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
            'Content-Type' => 'application/x-www-form-urlencoded',
        ];
        $this->body = $body;
    }

    public function setHeader($index, $value)
    {
        $this->headers[$index] = $value;
    }

    public function setHeaders($newHeaders)
    {
        $this->headers = $newHeaders;
    }

    public function loginRequest()
    {
        $response = $this->client->request($this->method, $this->url, 
        [
            'form_params' => $this->body,
            'headers' => $this->headers,
          ]);
          return $response;
    }

    public function apiRequest()
    {
        $foxdoxUsername = session('foxdoxUsername');
        $token = User::where('name', $foxdoxUsername)
                        ->pluck('foxdox-token')
                        ->first();
        $this->setHeader('X-TOKEN', $token);
        $response = $this->client->request($this->method, $this->url, 
        [
            'form_params' => $this->body,
            'headers' => $this->headers,
        ]);
        return $response;
    }
}
