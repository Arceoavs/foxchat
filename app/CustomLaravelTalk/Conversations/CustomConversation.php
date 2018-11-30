<?php

namespace App\CustomLaravelTalk\Conversations;

use Nahid\Talk\Conversations\Conversation;

class CustomConversation extends Conversation
{
    public $fillable = [
        'user_one',
        'user_two',
        'tag',
    ];
}
