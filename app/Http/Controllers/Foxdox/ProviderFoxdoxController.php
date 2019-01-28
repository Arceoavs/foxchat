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

/**
 * ProviderFoxdoxController is managing several
 * Api requests to foxdoxapi, wich are provider specific.
 * Methods are exposed through foxdoxapi/provider.
 */
class ProviderFoxdoxController extends Controller
{

    protected $chatapiservice;

    /**
     * Create a new ProviderFoxdoxController instance by 
     * validating if accessing user is a provider.
     *
     * @return void
     */
    public function __construct()
    {
        $this->validateProviderAsUser();
        $this->middleware('auth:api');
    }


    /**
     * validating user by reading isProvider column.
     * creating a new ChatApiService.
     */
    public function validateProviderAsUser()
    {
        if (auth()->user()->isProvider == 1) {
            $this->chatapiservice = new ChatAPIService();
            return true;
        } else {
            throw new ChatAuthException("You are not a Foxdox Provider.");
        }
    }

    /**
     * Listing all Services a Foxdox Provider is offering. 
     * 
     * @return JSON
     */
    public function listAllServices()
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://papi.foxdox.de/service/listall', []);

        $response = $foxdoxapiclient->apiRequest(auth()->user()->name);
        return $response;
    }

    /**
     * Listing all Subscribers using given service, for Rest Api, using Helper method, where actual foxdoxApi Request happens
     * @param ServiceID
     * @return JSON
     */
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
     * Helper Method for getting Subscribers, for a specific service
     * @param serviceID
     * @return JSON
     */
    protected function listSubscribersHelp($serviceId)
    {
        $body = [
            "providerServiceId" => $serviceId
        ];

        $foxdoxapiclient = new FoxdoxApiClient('https://papi.foxdox.de/service/listsubscribers', $body);

        $response = $foxdoxapiclient->apiRequest(auth()->user()->name);

        return $response;
    }

    /**
     * Listing all Subscribers of all services using @this->listSubscribersHelp() and
     * @this->listAllServices and elimnating duplicates
     * @return JSON
     */
    public function listAggregatedSubscribers()
    {
        $services = json_decode($this->listAllServices()->getBody())->Items;

        $aggrSubscribers = [];

        /**
         * concating all subscribers from all services
         */
        foreach ($services as $item) {
            $serviceId = $item->Id;
            $subscribers = json_decode($this->listSubscribersHelp($serviceId)->getBody())->Items;
            $aggrSubscribers = array_merge($aggrSubscribers, $subscribers);
        }

        $subscribersInDatabase = [];

        /**
         * removing duplicates
         */
        foreach ($aggrSubscribers as $item) {
            $notExistentinList = !(strpos(json_encode($subscribersInDatabase), $item->SubscriptionId));
            if ($this->isValidUser($item->UserProfile->UserName) && $notExistentinList) {
                array_push($subscribersInDatabase, $item);
            }
        }

        return $subscribersInDatabase;
    }

    /**
     * Selecting which variant is currently used
     */
    public function listSubscribersWithoutGeneralChat(){
        return $this->listSubscribersWithoutGeneralChatImpl1();
    }

    /**
     * Getting all subscribers from all services without duplicates and without subscribers, which
     * currently have a general chat with this provider. This Impl is using a direct getConversationByName Database Request
     * per subscriber, probably slow but stable.
     * @return JSON
     */
    public function listSubscribersWithoutGeneralChatImpl1()
    {
        $allSubs = $this->listAggregatedSubscribers();

        $output = [];
        foreach ($allSubs as $sub) {
            try {
                //determine if user has a general conversation with provider 
                $response = $this->chatapiservice->getConversationByName($sub->UserProfile->UserName, "allgemein", 0, 1, true);
                if ($response->getStatusCode() != 200) {
                    //only pushing to output, if general conversation unpresent
                    array_push($output, $sub);
                }
            } catch (\Throwable $th) {
                array_push($output, $sub);
            }

        }

        return $output;
    }

    /**
     * Getting all subscribers from all services without duplicates and without subscribers, which
     * currently have a general chat with this provider. This Impl is using the Inbox by only
     * executing one database request. This method is faster than Impl1 but has some 
     * unresolved inconsistencies.
     * @return JSON
     */
    public function listSubscribersWithoutGeneralChatImpl2(){
        $allSubs = $this->listAggregatedSubscribers();
        $chats = $this->getAllChats();
        $encodedUsers = "";
        
        if(is_array($chats)){
            foreach($chats as $chat){
                if($chat->thread->conversation_tag === "allgemein"){
                    $encodedUsers = $encodedUsers . $chat->withUser->name;
                }
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

    /**
     * Aggregating all Inbox Chats by using Pagination
     */
    protected function getAllChats(){
        $chats = $this->chatapiservice->getInboxAll(0, 100);

        if(is_array($chats)){
            $i = 1;
            do{
                $chatsNext = $this->chatapiservice->getInboxAll($i, 100);
                $chats = array_merge($chats, $chatsNext);
                $i++;
            } while(count($chatsNext) > 0);
        }
        return $chats;
    }
}