<?php

namespace App\Exceptions;

use Exception;

class ChatAPIServiceException extends Exception
{
    protected $chatobject;
    /**
     * This Exception will be used to define errors in the Chat Api.
     */
    public function __construct($chatobject)
    {
        $this->chatobject= $chatobject;
    }

    /**
     * This Exception will be called when an error occured.
     * @return JSON
     */
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
