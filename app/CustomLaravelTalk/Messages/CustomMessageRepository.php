<?php

namespace App\CustomLaravelTalk\Messages;

use Nahid\Talk\Messages\MessageRepository;
use App\CustomLaravelTalk\Messages\CustomMessage as Message;

class CustomMessageRepository extends MessageRepository
{
    public function takeModel()
    {
        return Message::class;
    }
}
