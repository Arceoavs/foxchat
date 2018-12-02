<?php

namespace App\CustomLaravelTalk;

use Nahid\Talk\Talk;

use App\CustomLaravelTalk\Conversations\CustomConversation as Conversation;
use App\CustomLaravelTalk\Messages\CustomMessage as Message;
use Illuminate\Support\Facades\Log;


class CustomTalk extends Talk
{ 
    /**
     * make new conversation the given receiverId with currently loggedin user.
     *
     * @param int $receiverId
     *
     * @return int
     */
    protected function newConversationWithTag($receiverId, $conversationtag)
    {
        $conversationId = $this->isConversationExistsWithTag($receiverId, $conversationtag);
        $user = $this->getSerializeUser($this->authUserId, $receiverId);

        if ($conversationId === false) {
            $conversation = $this->conversation->create([
                'user_one' => $user['one'],
                'user_two' => $user['two'],
                'tag' => $conversationtag,
            ]);

            if ($conversation) {
                return $conversation->id;
            }
        }

        return $conversationId;
    }
    
    /**
     * make sure is this conversation exist for this user with currently loggedin user.
     *
     * @param int $userId
     *
     * @return bool|int
     */
    public function isConversationExistsWithTag($userId, $conversationtag)
    {
        if (empty($userId)) {
            return false;
        }

        $user = $this->getSerializeUser($this->authUserId, $userId);

        return $this->conversation->isExistsAmongTwoUsersWithTag($user['one'], $user['two'], $conversationtag);
    }

    /**
     * create a new message by using receiverid.
     *
     * @param int    $receiverId
     * @param string $message
     *
     * @return \Nahid\Talk\Messages\Message
     */
    public function sendMessageByUserIdWithTag($receiverId, $message, $conversationtag)
    {
        // Log::info("in send Message");
        if ($conversationId = $this->isConversationExistsWithTag($receiverId, $conversationtag)) {
            $message = $this->makeMessage($conversationId, $message);

            return $message;
        }

        $convId = $this->newConversationWithTag($receiverId, $conversationtag);
        $message = $this->makeMessage($convId, $message);

        return $message;
    }

    /**
     * create a new message by using conversationId.
     *
     * @param int    $conversationId
     * @param string $message
     *
     * @return \Nahid\Talk\Messages\Message
     */
    protected function makeMessage($conversationId, $message)
    {
        $conversation =$this->conversation->where('id', $conversationId)->first();
        // Log::info($conversation->tag);
        $message = $this->message->create([
            'message' => $message,
            'conversation_id' => $conversationId,
            'conversation_tag' => $conversation->tag,
            'user_id' => $this->authUserId,
            'is_seen' => 0,
        ]);

        $message->conversation->touch();

        $this->broadcast->transmission($message);

        return $message;
    }

    /**
     * fetch all inbox with soft deleted message for currently loggedin user with pagination.
     *
     * @param int $offset
     * @param int $take
     *
     * @return array
     */
    public function getInboxAll($order = 'desc', $offset = 0, $take = 20)
    {
        return $this->conversation->inboxAll($this->authUserId, $order, $offset, $take);
    }
}
