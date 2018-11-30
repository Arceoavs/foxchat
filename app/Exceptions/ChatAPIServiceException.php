<?php

namespace App\Exceptions;

use Exception;

class ChatAPIServiceException extends Exception
{
    protected $chatobject;
    public function __construct($chatobject)
    {
        $this->chatobject= $chatobject;
    }

    public function render()
    {
        return response()->json(
            [
                'errors' => [
                    'status' => 400,
                    'message' => $this->chatobject . ' not valid.',
                ]
            ],
            400
        );
    }
}
