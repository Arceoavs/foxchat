<?php

namespace App\Exceptions;

use Exception;

class ReceiverNotValidException extends Exception
{
    public function render()
    {
        return response()->json(
            [
                'errors' => [
                    'status' => 400,
                    'message' => 'Receiver not valid.',
                ]
            ],
            400
        );
    }
}
