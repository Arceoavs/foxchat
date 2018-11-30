<?php

namespace App\Exceptions;

use Exception;

class UserNotValidException extends Exception
{
    public function render()
    {
        return response()->json(
            [
                'errors' => [
                    'status' => 400,
                    'message' => 'User not valid.',
                ]
            ],
            400
        );
    }
}
