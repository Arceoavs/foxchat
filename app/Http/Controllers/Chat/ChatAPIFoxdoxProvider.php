<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ChatAPIService as ChatAPIService;
use Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use App\Exceptions\ChatAPIServiceException;
use App\Exceptions\ChatAuthException;

class ChatAPIFoxdoxProvider extends Controller
{
    protected $chatapiservice;
    public function __construct()
    {
        if($this->validateUserAsProvider()){
            $this->chatapiservice = new ChatAPIService();
        }
        $this->middleware('auth:api');
    }

    public function validateUserAsProvider()
    {
        // Log::info(auth()->user()->isProvider);
        if(auth()->user()->isProvider==1){
            return true;
        }else{
            throw new ChatAuthException("You are not a Foxdox User.");
        }
    }

    public function sendMessageByFoxdoxProvider()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'receivinguser' => 'required',
            'message' => 'required',
            'conversationtag' => 'required'
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        //Get all the informations from the request
        $user = request()->input('receivinguser');
        $message = request()->input('message');
        $conversationtag = request()->input('conversationtag');

        return $this->chatapiservice->sendMessage($user, $message, $conversationtag);
    }
    
    public function getInboxForFoxdoxProvider()
    {
        return $this->chatapiservice->getInbox();
    }

    public function getInboxAllForFoxdoxProviderr()
    {
        return $this->chatapiservice->getInboxAll();
    }

    public function getConversationByUserName()
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

    public function getConversationAllByUserName()
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

    public function getConversationByUserId()
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

    public function getConversationAllByUserId()
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
