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

class ChatAPIFoxdoxProvider extends ChatAPI
{
    protected $chatapiservice;
    public function __construct()
    {
        if ($this->validateUserAsProvider()) {
            $this->chatapiservice = new ChatAPIService();
        }
        $this->middleware('auth:api');
    }

    public function validateUserAsProvider()
    {
        if (auth()->check()) {
            if (auth()->user()->isProvider == 1) {
                return true;
            } else {
                throw new ChatAuthException("You are not a Foxdox Provider.");
            }
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
}
