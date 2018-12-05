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

class ChatAPI extends Controller
{
    protected $chatapiservice;
    
    public function getInbox()
    {
        return $this->chatapiservice->getInbox();
    }

    public function getInboxAll()
    {
        return $this->chatapiservice->getInboxAll();
    }

    public function getConversationByName()
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

    public function getConversationAllName()
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

    public function getConversationById()
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

    public function getConversationAllById()
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
