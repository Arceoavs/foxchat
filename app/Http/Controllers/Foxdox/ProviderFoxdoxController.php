<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;
use App\Services\ChatAPIService;
use App\User;
use Validator;



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
        if (auth()->user()->isProvider == 1) {
            return true;
        } else {
            throw new ChatAuthException("You are not a Foxdox Provider.");
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

    private function listSubscribersHelp($serviceId)
    {
        $body = [
            "providerServiceId" =>  $serviceId
        ];

        $foxdoxapiclient = new FoxdoxApiClient('https://papi.foxdox.de/service/listsubscribers', $body);

        $response = $foxdoxapiclient->apiRequest(auth()->user()->name);
        return $response;
    }

    public function listAggregatedSubscribers()
    {
        $services = json_decode($this->listAllServices()->getBody())->Items;

        $aggrSubscribers = [];

        foreach($services as $item){
            $serviceId = $item->Id;
            $subscribers = json_decode($this->listSubscribersHelp($serviceId)->getBody())->Items;
            $aggrSubscribers = array_merge($aggrSubscribers, $subscribers);
        }

        return $aggrSubscribers;
    }
    

}