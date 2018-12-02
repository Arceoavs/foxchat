<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ChatAPIService as ChatAPIService;
use Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;

class ChatAPIFoxdoxUser extends Controller
{
    protected $chatapiservice;
    public function __construct()
    {
        $this->chatapiservice = new ChatAPIService();
        $this->middleware('auth:api');
    }

    public function sendMessageByFoxdoxUser()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'receivingprovider' => 'required',
            'message' => 'required',
            'conversationtag' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        //Get all the informations from the request
        $receivingprovider = request()->input('receivingprovider');
        $message = request()->input('message');
        $conversationtag = request()->input('conversationtag');

        return $this->chatapiservice->sendMessage($receivingprovider, $message, $conversationtag);
    }
    
    public function getInboxForFoxdoxUser()
    {
        return $this->chatapiservice->getInbox();
    }

    public function getConversationByProviderName()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'username' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = request()->input('username');

        return $this->chatapiservice->getConversationByUserId($user);
    }

    public function getConversationAllByProviderName()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'username' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = request()->input('username');

        return $this->chatapiservice->getConversationAllByUserId($user);
    }

    public function getConversationById()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'conversationid' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $conversationid = request()->input('conversationid');

        return $this->chatapiservice->getConversationById($conversationid);
    }

    public function getConversationAllById()
    {
        Log::info(Input::all());
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'conversationid' => 'required'
        ]);


        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $conversationid = request()->input('conversationid');

        return $this->chatapiservice->getConversationAllById($conversationid);
    }

    public function makeSeen()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'messageid' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $messageid = request()->input('messageid');

        return $this->chatapiservice->makeSeen($messageid);
    }
}
