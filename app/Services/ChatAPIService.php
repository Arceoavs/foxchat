<?php
namespace App\Services;

use App\User;
use App\CustomLaravelTalk\Conversations\CustomConversation;
use App\CustomLaravelTalk\Messages\CustomMessage;
use App\Http\Controllers\Controller;
use App\CustomLaravelTalk\Facade\CustomTalk;
use App\Exceptions\ChatAPIServiceException;
use Illuminate\Support\Facades\Auth;


use Illuminate\Support\Facades\Log;
use App\Events\MessageWasSent;
use Tymon\JWTAuth\Claims\Custom;
use App\Events\MessageWasRead;

class ChatAPIService extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        if (Auth::check()) {
            CustomTalk::setAuthUserId(auth()->user()->id);
        }
    }

    protected function getUserFromDatabase($username)
    {
        return User::where('name', $username)->first();
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
        if (!$this->getUserFromDatabase($username)) {
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
        if (!$this->isValidReceiver($receiver)) {
            throw new ChatAPIServiceException("Receiver");
        }
        $receiver = $this->getUserFromDatabase($receiver);
        $sentMessage = CustomTalk::sendMessageByUserIdWithTag($receiver->id, $message, $conversationtag);
        event(new MessageWasSent(Auth::user(), $receiver));
        return $sentMessage;
    }

    public function getInbox($offset, $take)
    {
        return CustomTalk::getInbox('desc', $offset, $take);
    }

    public function getInboxAll($offset, $take)
    {
        return CustomTalk::getInboxAll('desc', $offset, $take);
    }

    public function getConversationByName($username, $conversationtag, $offset, $take, $triggeredByPusherEvent)
    {
        $chatpartner = $this->getUserFromDatabase($username);


        if (!$chatpartner) {
            throw new ChatAPIServiceException("Provided Name");
        }

        $conversation = CustomConversation::where(["user_one" => $chatpartner->id, "user_two" => auth()->user()->id, "tag" => $conversationtag])->first();
        if (!$conversation) {
            $conversation = CustomConversation::where(["user_one" => auth()->user()->id, "user_two" => $chatpartner->id, "tag" => $conversationtag])->first();
        }
        if (!$conversation) {
            throw new ChatAPIServiceException("Provided Tag, Username or the combination of both");
        }

        if($triggeredByPusherEvent != true && $triggeredByPusherEvent != false){
            throw new ChatAPIServiceException("Provided triggeredByPusherEvent");
        }
        $receiver = $this->getUserFromDatabase($username);
        if(!$triggeredByPusherEvent){
            event(new MessageWasRead(Auth::user(), $receiver));
        }
        return response()->json(CustomTalk::getConversationsById($conversation->id, $offset, $take));
    }

    public function getConversationAllByName($username, $conversationtag, $offset, $take)
    {
        $chatpartner = $this->getUserFromDatabase($username);
        if (!$chatpartner) {
            throw new ChatAPIServiceException("Provided Name");
        }
        $conversation = CustomConversation::where(["user_one" => $chatpartner->id, "user_two" => auth()->user()->id, "tag" => $conversationtag])->first();
        if (!$conversation) {
            $conversation = CustomConversation::where(["user_one" => auth()->user()->id, "user_two" => $chatpartner->id, "tag" => $conversationtag])->first();
        }
        if (!$conversation) {
            throw new ChatAPIServiceException("Provided Tag, Username or the combination of both");
        }
        return response()->json(CustomTalk::getConversationsAllById($conversation->id, $offset, $take));
    }

    public function getConversationById($userid, $conversationtag, $offset, $take)
    {
        $chatpartner = User::find($userid);
        if (!$chatpartner) {
            throw new ChatAPIServiceException("Provided Userid");
        }
        $conversation = CustomConversation::where(["user_one" => $chatpartner->id, "user_two" => auth()->user()->id, "tag" => $conversationtag])->first();
        if (!$conversation) {
            $conversation = CustomConversation::where(["user_one" => auth()->user()->id, "user_two" => $chatpartner->id, "tag" => $conversationtag])->first();
        }
        if (!$conversation) {
            throw new ChatAPIServiceException("Provided Tag, Id or the combination of both");
        }
        return response()->json(CustomTalk::getConversationsById($conversation->id, $offset, $take));
    }

    public function getConversationAllById($userid, $conversationtag, $offset, $take)
    {
        $chatpartner = User::find($userid);
        if (!$chatpartner) {
            throw new ChatAPIServiceException("Provided Userid");
        }
        $conversation = CustomConversation::where(["user_one" => $chatpartner->id, "user_two" => auth()->user()->id, "tag" => $conversationtag])->first();
        if (!$conversation) {
            $conversation = CustomConversation::where(["user_one" => auth()->user()->id, "user_two" => $chatpartner->id, "tag" => $conversationtag])->first();
        }
        if (!$conversation) {
            throw new ChatAPIServiceException("Provided Tag, Id or the combination of both");
        }
        return response()->json(CustomTalk::getConversationsAllById($conversation->id, $offset, $take));
    }

    public function makeSeen($messageid)
    {
        $message = $this->getMessageFromDatabase($messageid);
        if (!$message) {
            throw new ChatAPIServiceException("MessageId");
        }

        if (CustomTalk::makeSeen($message->id)) {
            return [
                "message" => $message->id,
                "text" => "Marked as seen."
            ];
        }
    }

    public function makeConversationSeen($conversationid)
    {
        // $messages = CustomMessage::where(["user_id" => !auth()->user()->id, "conversation_id" => $conversationid])->get();
        $messages = CustomMessage::where([["conversation_id", "=", $conversationid ], ["user_id", "!=", auth()->user()->id]]);
        // Log::info($messages);

        if (!$messages) {
            throw new ChatAPIServiceException("conversationid");
        }

        $messages->update(["is_seen" => 1]);

        // foreach ($messages as $message) {
        //     $message->update(["make_seen" => 1]);
        // }

        return response()->json(["conversation" => $conversationid, "text" => "Marked as seen."]);
    }

    public function deleteMessage($messageid)
    {
        $message = $this->getMessageFromDatabase($messageid);
        if (!$message) {
            throw new ChatAPIServiceException("MessageId");
        }

        if (CustomTalk::deleteMessage($message->id)) {
            return [
                "message" => $message->id,
                "text" => "Has been soft deleted."
            ];
        }
    }

}