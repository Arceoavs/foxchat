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
    /**
     * Creates a ChatService instance
     * Works only when the User calling this is authenticated
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        if (Auth::check()) {
            CustomTalk::setAuthUserId(auth()->user()->id);
        }
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
     * getting conversation from database
     * @param conversationid
     * @return CustomConversation object
     */
    protected function getConversationFromDatabase($conversationid)
    {
        return CustomConversation::find($conversationid);
    }

    /**
     * getting messageid from database
     * @param messageid
     * @return CustomMessage object
     */
    protected function getMessageFromDatabase($messageid)
    {
        return CustomMessage::find($messageid);
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
     * validating, that receiver is in the database & when calling from a user not a user or
     * when calling from a provider not a provider
     * @param username
     * @return true if user is valid, false if user not found
     */
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

    /**
     * Sending a message using Laravel Talk 
     * Also broadcasts the event for the Push notifications to Pusher
     * @param receiver
     * @param message
     * @param conversationtag
     * @return JSON message model
     */
    public function sendMessage($receiver, $message, $conversationtag)
    {
        if (!$this->isValidReceiver($receiver)) {
            throw new ChatAPIServiceException("Receiver");
        }
        $receiver = $this->getUserFromDatabase($receiver);
        $sentMessage = CustomTalk::sendMessageByUserIdWithTag($receiver->id, $message, $conversationtag);
        event(new MessageWasSent(Auth::user(), $receiver, $conversationtag));
        return $sentMessage;
    }

    /**
     * Getting the inbox for the user using Laravel Talk, with possible paging
     * @param offset
     * @param take
     * @return JSON inbox model
     */
    public function getInbox($offset, $take)
    {
        return CustomTalk::getInbox('desc', $offset, $take);
    }

    /**
     * Getting the inbox (even soft deleted ones) for the user using Laravel Talk, with possible paging
     * @param offset
     * @param take
     * @return JSON inbox model
     */
    public function getInboxAll($offset, $take)
    {
        return CustomTalk::getInboxAll('desc', $offset, $take);
    }

    /**
     * Getting the conversation for the user using Laravel Talk, with possible paging
     * Broadcasting the event that the message was read to the other chat participant
     * @param username
     * @param conversationtag
     * @param offset
     * @param take
     * @param triggeredByPusherEvent
     * @return JSON conversation model
     */
    public function getConversationByName($username, $conversationtag, $offset, $take)
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
        return response()->json(CustomTalk::getConversationsById($conversation->id, $offset, $take));
    }

    /**
     * Getting the conversation (even soft deleted ones) for the user using Laravel Talk, with possible paging
     * @param username
     * @param conversationtag
     * @param offset
     * @param take
     * @return JSON conversation model
     */
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

    /**
     * Getting the conversation for the user using Laravel Talk, with possible paging
     * @param userid
     * @param conversationtag
     * @param offset
     * @param take
     * @return JSON conversation model
     */
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

    /**
     * Getting the conversation (even soft deleted ones) for the user using Laravel Talk, with possible paging
     * @param userid
     * @param conversationtag
     * @param offset
     * @param take
     * @return JSON conversation model
     */
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

    /**
     * Marks a specific message as seen
     * @param messageid
     * @return JSON message object
     */
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

    /**
     * Marks a hole conversation as seen 
     * @param conversationid
     * @return JSON conversation object
     */
    public function makeConversationSeen($conversationid, $username, $triggeredByPusherEvent)
    {
        $chatpartner = $this->getUserFromDatabase($username);
        if (!$chatpartner) {
            throw new ChatAPIServiceException("Provided Username");
        }
        $messages = CustomMessage::where([["conversation_id", "=", $conversationid], ["user_id", "!=", auth()->user()->id]]);
        if (!$messages) {
            throw new ChatAPIServiceException("conversationid");
        }
        if ($triggeredByPusherEvent != true && $triggeredByPusherEvent != false) {
            throw new ChatAPIServiceException("Provided triggeredByPusherEvent");
        }
        $receiver = $this->getUserFromDatabase($username);
        $messages->update(["is_seen" => 1]);
        if (!$triggeredByPusherEvent) {
            event(new MessageWasRead(Auth::user(), $receiver));
        }
        return response()->json(["conversation" => $conversationid, "text" => "Marked as seen."]);
    }

    /**
     * Archived a specific message 
     * @param messageid
     * @return JSON conversation object
     */
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