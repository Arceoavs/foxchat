<?php

namespace App\Providers;
//Von original Klasse
use Illuminate\Container\Container;
use Illuminate\Foundation\Application as LaravelApplication;
use Illuminate\Support\ServiceProvider;
use Laravel\Lumen\Application as LumenApplication;
use App\CustomLaravelTalk\Conversations\CustomConversationRepository as ConversationRepository;
use App\CustomLaravelTalk\Messages\CustomMessageRepository as MessageRepository;

//Benötigt für Abänderung
use Nahid\Talk\TalkServiceProvider;
use App\CustomLaravelTalk\CustomTalk;


class CustomTalkServiceProvider extends TalkServiceProvider
{
    protected function registerTalk()
    {
        $this->app->singleton('customtalk', function (Container $app) {
            return new CustomTalk($app['config'], $app['talk.broadcast'], $app[ConversationRepository::class], $app[MessageRepository::class]);
        });

        $this->app->alias('customtalk', CustomTalk::class);
    }

        /**
     * Get the services provided by the provider.
     *
     * @return string[]
     */
    public function provides()
    {
        return [
            'customtalk',
            'talk.broadcast',
        ];
    }
}
