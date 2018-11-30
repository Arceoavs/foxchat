<?php

namespace App\CustomTalk\Facades;

use Illuminate\Support\Facades\Facade;

class CustomTalk extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'customtalk';
    }
}
