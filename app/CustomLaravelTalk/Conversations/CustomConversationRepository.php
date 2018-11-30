<?php

namespace App\CustomLaravelTalk\Conversations;

use Nahid\Talk\Conversations\ConversationRepository;
use App\CustomLaravelTalk\Conversations\CustomConversation as Conversation;


class CustomConversationRepository extends ConversationRepository
{
    public function takeModel()
    {
        return Conversation::class;
    }

    /*
     * check this given two users is already make a conversation
     *
     * @param   int $user1
     * @param   int $user2
     * @return  int|bool
     * */
    public function isExistsAmongTwoUsersWithTag($user1, $user2, $conversationtag)
    {
        $conversation = Conversation::where('user_one', $user1)
            ->where('user_two', $user2)->where('tag', $conversationtag);

        if ($conversation->exists()) {
            return $conversation->first()->id;
        }

        return false;
    }

    /*
     * retrieve all message thread without soft deleted message with latest one message and
     * sender and receiver user model
     *
     * @param   int $user
     * @param   int $offset
     * @param   int $take
     * @return  collection
     * */
    public function threads($user, $order, $offset, $take)
    {
        $conv = new Conversation();
        $conv->authUser = $user;
        $msgThread = $conv->with(['messages' => function ($q) use ($user) {
            return $q->where(function ($q) use ($user) {
                $q->where('user_id', $user)
                        ->where('deleted_from_sender', 0);
            })
                ->orWhere(function ($q) use ($user) {
                    $q->where('user_id', '!=', $user);
                    $q->where('deleted_from_receiver', 0);
                })
            ->latest();
        },'messages.sender', 'userone', 'usertwo'])
            ->where('user_one', $user)
            ->orWhere('user_two', $user)
            ->offset($offset)
            ->take($take)
            ->orderBy('updated_at', $order)
            ->get();

        $threads = [];

        foreach ($msgThread as $thread) {
            $collection = (object) null;
            $conversationWith = ($thread->userone->id == $user) ? $thread->usertwo : $thread->userone;
            $collection->thread = $thread->messages->first();
            $collection->withUser = $conversationWith;
            $threads[] = $collection;
        }

        return collect($threads);
    }
}
