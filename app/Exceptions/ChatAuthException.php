<?php

namespace App\Exceptions;

use Exception;

class ChatAuthException extends Exception
{
    protected $chatobject;
    /**
     * This Exception will be used to determine if a Foxdox User called the Foxdox Provider Chat API
     * and other way around.
     */
    public function __construct($chatobject)
    {
        $this->chatobject = $chatobject;
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
                    'message' => $this->chatobject,
                ]
            ],
            400
        );
    }
}