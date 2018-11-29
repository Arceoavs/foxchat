<?php

namespace App\Http\Controllers\Chat;

use Nahid\Talk\Talk;

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
        Log::info("in nmew conversation");
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
        Log::info("in send Message");
        if ($conversationId = $this->isConversationExistsWithTag($receiverId, $conversationtag)) {
            $message = $this->makeMessage($conversationId, $message);

            return $message;
        }

        $convId = $this->newConversationWithTag($receiverId, $conversationtag);
        $message = $this->makeMessage($convId, $message);

        return $message;
    }
}
