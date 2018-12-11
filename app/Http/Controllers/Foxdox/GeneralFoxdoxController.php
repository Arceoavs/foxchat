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
        if (auth()->user()->isProvider == 0) {
            return true;
        } else {
            throw new ChatAuthException("You are not a Foxdox User.");
        }
    }

    public function listProviders()
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/provider/listproviders', []);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    public function listServices($providername)
    {
        $body = [
            "providerShortName" => $providername
        ];
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/provider/listservices', $body);

        $response = $foxdoxapiclient->apiRequest(auth()->user()->name);
        return $response;
    }

    public function listProvidersforOverview()
    {
        $listproviders = json_decode($this->listProviders()->getBody()->getContents(), true)['Items'];
        $newlist = [];
        for ($x = 0; $x < count($listproviders); $x++) {
            $element = $listproviders[$x];
            $serviceresponse = json_decode($this->listServices($element['ProviderShortName'])->getBody()->getContents(), true)['Items'];
            if (!$serviceresponse == []) {
                $subscriptions = $serviceresponse[0]['Subscriptions'];
                if (!$subscriptions == []) {
                    if($subscriptions[0]['State']==2){
                        array_push($newlist, $element['ProviderShortName']);
                    }
                }
            }
        }
        return ["Items" => $newlist];
    }
}
