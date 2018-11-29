<?php

namespace App;

use Nahid\Talk\Messages\Message;

class CustomMessage extends Message
{
    public $fillable = [
        'message',
        'is_seen',
        'deleted_from_sender',
        'deleted_from_receiver',
        'user_id',
        'conversation_id',
        'conversation_tag'
    ];
}
