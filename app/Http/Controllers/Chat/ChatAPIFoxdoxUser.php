<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CustomTalk\Facades\CustomTalk;
use App\Services\ChatAPIService as ChatAPIService;
use Validator;

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

        if($this->chatapiservice->isValidReceiver($receivingprovider)){
            return $this->chatapiservice->sendMessage($receivingprovider, $message, $conversationtag);
        }
    }
    
    public function getInboxForFoxdoxUser()
    {
        return $this->chatapiservice->getInbox();
    }
}
