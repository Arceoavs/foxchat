<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;
use App\Services\ChatAPIService as ChatAPIService;
use App\Exceptions\ChatAPIServiceException;
use App\User;
use Validator;
use GuzzleHttp\Stream\Stream;



class ProviderFoxdoxController extends Controller
{

    protected $chatapiservice;

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
            $this->chatapiservice = new ChatAPIService();
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

        $aggrSubscribers = [];

        foreach ($services as $item) {
            $serviceId = $item->Id;
            $subscribers = json_decode($this->listSubscribersHelp($serviceId)->getBody())->Items;
            $aggrSubscribers = array_merge($aggrSubscribers, $subscribers);
        }

        $subscribersInDatabase = [];

        foreach ($aggrSubscribers as $item) {
            $notExistentinList = !(strpos(json_encode($subscribersInDatabase), $item->SubscriptionId));
            if ($this->isValidUser($item->UserProfile->UserName) && $notExistentinList) {
                array_push($subscribersInDatabase, $item);
            }
        }

        return $subscribersInDatabase;
    }

    public function listSubscribersWithoutGeneralChat()
    {
        $allSubs = $this->listAggregatedSubscribers();

        $output = [];
        foreach ($allSubs as $sub) {
            try {
                $response = $this->chatapiservice->getConversationByName($sub->UserProfile->UserName, "allgemein", 0, 1);
                if ($response->getStatusCode() != 200) {
                    array_push($output, $sub);
                }
            } catch (\Throwable $th) {
                array_push($output, $sub);
            }

        }

        return $output;
    }
    

    /*public function listSubscribersWithoutGeneralChatHelp(){
        $allSubs = $this->listAggregatedSubscribers();
        $chats = $this->getAllChats();
        $encodedUsers = "";
        
        if(is_array($chats)){
            foreach($chats as $chat){
                if($chat->thread->conversation_tag === "allgemein"){
                    $encodedUsers = $encodedUsers . $chat->withUser->name;
                }
            }
        }else if($chats != null){
            if($chat->thread->conversation_tag === "allgemein"){
                $encodedUsers = $encodedUsers . $chat->withUser->name;
            }
        }
        
        $output = [];
        foreach($allSubs as $sub){
            if(!strpos($encodedUsers, $sub->UserProfile->UserName)){
                array_push($output, $sub);
            }
        }

        return $output;
    }    

    protected function getAllChats(){
        $chats = $this->chatapiservice->getInboxAll(0, 10);

        if(is_array($chats)){
            $i = 1;
            do{
                $chatsNext = $this->chatapiservice->getInboxAll($i, 10);
                $chats = array_merge($chats, $chatsNext);
                $i++;
            } while(count($chatsNext) > 0);
        }
        return $chats;
    }
     */

}