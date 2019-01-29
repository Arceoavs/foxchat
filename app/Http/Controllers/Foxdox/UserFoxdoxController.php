<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;
use App\Services\ChatAPIService;
use App\User;



class UserFoxdoxController extends Controller
{
    /**
     * Create a new UserFoxdoxController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->validateUserAsUser();
        $this->middleware('auth:api');
    }

    /**
     * validating user by reading isProvider column.
     * creating a new ChatApiService.
     */
    public function validateUserAsUser()
    {
        if (auth()->check()) {
            if (auth()->user()->isProvider == 0) {
                return true;
            } else {
                throw new ChatAuthException("You are not a Foxdox User.");
            }
        }
    }

    /**
     * getting user from database
     * @param username
     * @return User object
     */
    protected function getUserFromDatabase($username)
    {
        return User::where('name', $username)->first();
    }

    /**
     * validating, that user is persistent in database
     * @param username
     * @return true if user is valid, false if user not found
     */
    protected function isValidUser($username)
    {
        if (!$this->getUserFromDatabase($username)) {
            return false;
        }
        return true;
    }

    /**
     * List the providers of the user
     * @return JSON
     */
    public function listProviders()
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/provider/listproviders', []);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    /**
     * List all services to a subscribed provider
     * @param providerShortName
     * @return JSON
     */
    public function listServices($providername)
    {
        $body = [
            "providerShortName" => $providername
        ];
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/provider/listservices', $body);

        $response = $foxdoxapiclient->apiRequest(auth()->user()->name);
        return $response;
    }

    /**
     * Computes the result for the frontend by listing all subscribed and to Fox-Chat registered
     * Foxdox Providers
     * @return Array
     */
    public function listProvidersforOverview()
    {
        $listproviders = json_decode($this->listProviders()->getBody()->getContents(), true)['Items'];
        $newlist = [];
        for ($x = 0; $x < count($listproviders); $x++) {
            $element = $listproviders[$x];
            if ($this->isValidUser($element['ProviderShortName'])) {
                $serviceresponse = json_decode($this->listServices($element['ProviderShortName'])->getBody()->getContents(), true)['Items'];
                if (!$serviceresponse == []) {
                    $subscriptions = $serviceresponse[0]['Subscriptions'];
                    if (!$subscriptions == []) {
                        if ($subscriptions[0]['State'] == 2) {
                            array_push($newlist, $element);
                        }
                    }
                }
            }
        }
        return $newlist;
    }
}
