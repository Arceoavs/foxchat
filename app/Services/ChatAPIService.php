<?php
namespace App\Services;
 
use App\User;
use App\CustomLaravelTalk\Conversations\CustomConversation;
use App\Http\Controllers\Controller;
use App\CustomTalk\Facades\CustomTalk;
use App\Exceptions\ChatAPIServiceException;

use Illuminate\Support\Facades\Log;

class ChatAPIService extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        CustomTalk::setAuthUserId(auth()->user()->id);
    }

    protected function getUserFromDatabase($username)
    {
        return User::where('name' ,$username)->first();
    }

    protected function getConversationFromDatabase($conversationid)
    {
        return CustomConversation::find($conversationid);
    }

    protected function getMessageFromDatabase($messageid)
    {
        return CustomMessage::find($messageid);
    }

    protected function isValidUser($username)
    {
        if(!$this->getUserFromDatabase($username)){
            return false;
        }
        return true;
    }
 
    public function isValidReceiver($username)
    {
        //Try to find user in database
        $user = $this->getUserFromDatabase($username);
        // Throws an Exception whether the Receiver is not found or the Receiver is not the Opposite of the Sender (User/ Provider)
        if (!$this->isValidUser($username) || (auth()->user()->isProvider == $user->isProvider)) {
            return false;
        }
        return true;
    }

    public function sendMessage($receiver, $message, $conversationtag)
    {
        if(!$this->isValidReceiver($receiver)){
            throw new ChatAPIServiceException("Receiver");
        }
        $receiver = $this->getUserFromDatabase($receiver);
        return CustomTalk::sendMessageByUserIdWithTag($receiver->id, $message, $conversationtag);
    }

    public function getInbox()
    {
        return CustomTalk::getInbox();
    }

    public function getConversationByUserId($username)
    {
        if(!$this->isValidUser($username)){
            throw new ChatAPIServiceException("User");
        }
        $user = $this->getUserFromDatabase($username);
        return response()->json(CustomTalk::getConversationsByUserId($user->id));
    }

    public function getConversationAllByUserId($username)
    {
        if(!$this->isValidUser($username)){
            throw new ChatAPIServiceException("User");
        }
        $user = $this->getUserFromDatabase($username);
        return response()->json(CustomTalk::getConversationsAllByUserId($user->id));
    }

    public function getConversationById($conversationid)
    {
        $conversation = $this->getConversationFromDatabase($conversationid);
        if(!$conversation){
            throw new ChatAPIServiceException("ConversationId");
        }
        return response()->json(CustomTalk::getConversationsByUserId($conversation->id));
    }

    public function getConversationAllById($conversationid)
    {
        $conversation = $this->getConversationFromDatabase($conversationid);
        if(!$conversation){
            throw new ChatAPIServiceException("ConversationId");
        }
        return response()->json(CustomTalk::getConversationsAllByUserId($conversation->id));
    }

    public function makeSeen($messageid)
    {
        $message = $this->getMessageFromDatabase($messageid);
        if(!$message){
            throw new ChatAPIServiceException("MessageId");
        }
        return response()->json(CustomTalk::makeSeen($message->id));
    }
 
}