<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    //Login requests for FoxdoxUser
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');

    //Login requests for FoxdoxProviders
    Route::post('provider/login', 'AuthControllerProvider@login');
    Route::post('provider/logout', 'AuthControllerProvider@logout');
    Route::post('provider/refresh', 'AuthControllerProvider@refresh');
    Route::get('provider/me', 'AuthControllerProvider@me');
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'chat/user'

], function ($router) {

    //Chat requests for FoxdoxUser
    Route::post('sendmessage', 'Chat\ChatAPIFoxdoxUser@sendMessageByFoxdoxUser');
    Route::get('getinbox', 'Chat\ChatAPIFoxdoxUser@getInboxForFoxdoxUser');
    Route::get('getinboxall', 'Chat\ChatAPIFoxdoxUser@getInboxAllForFoxdoxUser');
    Route::post('getconversationbyprovidername', 'Chat\ChatAPIFoxdoxUser@getConversationByProviderName');
    Route::post('getconversationbyprovidernameall', 'Chat\ChatAPIFoxdoxUser@getConversationAllByProviderName');
    Route::post('getconversationbyproviderid', 'Chat\ChatAPIFoxdoxUser@getConversationByProviderId');
    Route::post('getconversationbyprovideridall', 'Chat\ChatAPIFoxdoxUser@getConversationAllByProviderId');
    Route::patch('makeseen', 'Chat\ChatAPIFoxdoxUser@makeSeen');
    Route::patch('deletemessage', 'Chat\ChatAPIFoxdoxUser@deleteMessage');

});
