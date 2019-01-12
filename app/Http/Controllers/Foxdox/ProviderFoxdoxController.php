<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;
use App\Services\ChatAPIService;
use App\User;
use Validator;
use GuzzleHttp\Stream\Stream;



class ProviderFoxdoxController extends Controller
{
    /**
     * Create a new ProviderFoxdoxController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->validateProviderAsUser();
        $this->middleware('auth:api');
    }


    public function validateProviderAsUser()
    {
        if (auth()->check()) {
            if (auth()->user()->isProvider == 1) {
                return true;
            } else {
                throw new ChatAuthException("You are not a Foxdox Provider.");
            }
        }
    }

    public function listAllServices()
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://papi.foxdox.de/service/listall', []);

        $response = $foxdoxapiclient->apiRequest(auth()->user()->name);
        return $response;
    }

    public function listSubscribers()
    {
        //Check if provided requests contains the needed parameters
        $validator = Validator::make(request()->all(), [
            'serviceId' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $serviceId = request()->input('serviceId');

        return $this->listSubscribersHelp($serviceId);
    }

    protected function getUserFromDatabase($username)
    {
        return User::where('name', $username)->first();
    }

    protected function isValidUser($username)
    {
        if (!$this->getUserFromDatabase($username)) {
            return false;
        }
        return true;
    }

    protected function listSubscribersHelp($serviceId)
    {
        $body = [
            "providerServiceId" => $serviceId
        ];

        $foxdoxapiclient = new FoxdoxApiClient('https://papi.foxdox.de/service/listsubscribers', $body);

        $response = $foxdoxapiclient->apiRequest(auth()->user()->name);

        return $response;
    }

    public function listAggregatedSubscribers()
    {
        $services = json_decode($this->listAllServices()->getBody())->Items;

        array_push($services, json_decode("{\"Id\":\"0b1fb13f-0d7c-498d-82e3-96184896dd0d\"}"));

        $aggrSubscribers = [];

        foreach ($services as $item) {
            $serviceId = $item->Id;
            $subscribers = json_decode($this->listSubscribersHelp($serviceId)->getBody())->Items;
            $aggrSubscribers = array_merge($aggrSubscribers, $subscribers);
        }

        $subscribersInDatabase = [];

        foreach ($aggrSubscribers as $item) {
            $booleanExistsAlready = false == strpos(json_encode($subscribersInDatabase), $item->SubscriptionId);
            if ($this->isValidUser($item->UserProfile->UserName) && $booleanExistsAlready) {
                array_push($subscribersInDatabase, $item);
            }
        }

        return $subscribersInDatabase;
    }


}