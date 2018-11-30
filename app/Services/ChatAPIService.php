<?php
namespace App\Services;
 
use App\User;
use App\Exceptions\ReceiverNotValidException;
use App\Http\Controllers\Controller;
use App\CustomTalk\Facades\CustomTalk;

use Illuminate\Support\Facades\Log;



 
class ChatAPIService extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        CustomTalk::setAuthUserId(auth()->user()->id);
    }
 
    public function isValidReceiver($user_id)
    {
        //Try to find user in database
        $user = User::find($user_id);
        // Throws an Exception whether the Receiver is not found or the Receiver is not the Opposite of the Sender (User/ Provider)
        if (!$user || (auth()->user()->isProvider == $user->isProvider)) {
            throw new ReceiverNotValidException();
        }
        return true;
    }

    public function sendMessage($receiver, $message, $conversationtag)
    {
        return CustomTalk::sendMessageByUserIdWithTag($receiver, $message, $conversationtag);
    }

    public function getInbox()
    {
        return CustomTalk::getInbox();
    }
 
}