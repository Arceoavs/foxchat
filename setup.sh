#!/bin/bash
# My first script

echo "Hello I will install your Laravel dev version for manual purpose"

echo "Please make sure, that you have your .env file configured properly"

if [ -e ".env" ]
then
    echo "Setup: composer install"
	composer install

    echo "Setup: php artisan key:generate"
    php artisan key:generate

    echo "Setup: php artisan migrate:fresh"
    php artisan migrate:fresh

    echo "Setup: php artisan jwt:secret"
    php artisan jwt:secret

    echo "Setup: npm install"
    npm install
else
	echo "WARNING!!!! .env not found."
fi