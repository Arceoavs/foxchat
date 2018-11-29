<?php

namespace App;

use Nahid\Talk\Conversations\Conversation;

class CustomConversation extends Conversation
{
    public $fillable = [
        'user_one',
        'user_two',
        'tag',
    ];
}
