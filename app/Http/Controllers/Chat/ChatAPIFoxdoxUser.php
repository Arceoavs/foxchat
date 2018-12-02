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

    public function getInboxAllForFoxdoxUser()
    {
        return $this->chatapiservice->getInboxAll();
    }

    public function getConversationByProviderName()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'username' => 'required',
            'conversationtag' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = request()->input('username');
        $conversationtag = request()->input('conversationtag');

        return $this->chatapiservice->getConversationByName($user, $conversationtag);
    }

    public function getConversationAllByProviderName()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'username' => 'required',
            'conversationtag' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = request()->input('username');
        $conversationtag = request()->input('conversationtag');

        return $this->chatapiservice->getConversationAllByName($user, $conversationtag);
    }

    public function getConversationByProviderId()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'userid' => 'required',
            'conversationtag' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = request()->input('userid');
        $conversationtag = request()->input('conversationtag');

        return $this->chatapiservice->getConversationById($user, $conversationtag);
    }

    public function getConversationAllByProviderId()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'userid' => 'required',
            'conversationtag' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = request()->input('userid');
        $conversationtag = request()->input('conversationtag');

        return $this->chatapiservice->getConversationAllById($user, $conversationtag);
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

    public function deleteMessage()
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

        return $this->chatapiservice->deleteMessage($messageid);
    }
}
