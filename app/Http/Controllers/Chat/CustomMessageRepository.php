<?php

namespace App\Http\Controllers\Chat;

use Nahid\Talk\Messages\MessageRepository;
use App\CustomMessage as Message;

class CustomMessageRepository extends MessageRepository
{
    public function takeModel()
    {
        return Message::class;
    }
}
