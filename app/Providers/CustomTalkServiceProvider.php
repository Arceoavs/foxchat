<?php

namespace App\Providers;
//Von original Klasse
use Illuminate\Container\Container;
use Illuminate\Foundation\Application as LaravelApplication;
use Illuminate\Support\ServiceProvider;
use Laravel\Lumen\Application as LumenApplication;
use App\Http\Controllers\Chat\CustomConversationRepository as ConversationRepository;
use Nahid\Talk\Messages\MessageRepository;

//Benötigt für Abänderung
use Nahid\Talk\TalkServiceProvider;
use App\Http\Controllers\Chat\CustomTalk;


class CustomTalkServiceProvider extends TalkServiceProvider
{
    protected function registerTalk()
    {
        $this->app->singleton('talk', function (Container $app) {
            return new CustomTalk($app['config'], $app['talk.broadcast'], $app[ConversationRepository::class], $app[MessageRepository::class]);
        });

        $this->app->alias('talk', CustomTalk::class);
    }
}
