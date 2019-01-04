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
    Route::post('user/login', 'AuthController@login');
    Route::post('user/logout', 'AuthController@logout');
    Route::post('user/refresh', 'AuthController@refresh');
    Route::get('user/me', 'AuthController@me');

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
    Route::post('getinbox', 'Chat\ChatAPIFoxdoxUser@getInbox');
    Route::post('getinboxall', 'Chat\ChatAPIFoxdoxUser@getInboxAll');
    Route::post('getconversationbyname', 'Chat\ChatAPIFoxdoxUser@getConversationByName');
    Route::post('getconversationbynameall', 'Chat\ChatAPIFoxdoxUser@getConversationByNameAll');
    Route::post('getconversationbyid', 'Chat\ChatAPIFoxdoxUser@getConversationById');
    Route::post('getconversationbyidall', 'Chat\ChatAPIFoxdoxUser@getConversationByIdAll');
    Route::patch('makeseen', 'Chat\ChatAPIFoxdoxUser@makeSeen');
    Route::patch('deletemessage', 'Chat\ChatAPIFoxdoxUser@deleteMessage');

});

Route::group([

    'middleware' => 'api',
    'prefix' => 'chat/provider'

], function ($router) {

    //Chat requests for FoxdoxUser
    Route::post('sendmessage', 'Chat\ChatAPIFoxdoxProvider@sendMessageByFoxdoxProvider');
    Route::post('getinbox', 'Chat\ChatAPIFoxdoxProvider@getInbox');
    Route::post('getinboxall', 'Chat\ChatAPIFoxdoxProvider@getInboxAll');
    Route::post('getconversationbyname', 'Chat\ChatAPIFoxdoxProvider@getConversationByName');
    Route::post('getconversationbynameall', 'Chat\ChatAPIFoxdoxProvider@getConversationByNameAll');
    Route::post('getconversationbyid', 'Chat\ChatAPIFoxdoxProvider@getConversationById');
    Route::post('getconversationbyidall', 'Chat\ChatAPIFoxdoxProvider@getConversationByIdAll');
    Route::patch('makeseen', 'Chat\ChatAPIFoxdoxProvider@makeSeen');
    Route::patch('deletemessage', 'Chat\ChatAPIFoxdoxProvider@deleteMessage');

});

Route::group([

    'middleware' => 'api',
    'prefix' => 'foxdoxapi/user'

], function ($router) {

    //Foxdox data requests for FoxdoxUser
    Route::get('listproviders', 'Foxdox\GeneralFoxdoxController@listProviders');
    Route::get('listprovidersforoverview', 'Foxdox\GeneralFoxdoxController@listProvidersforOverview');
    
    Route::get('listalldocs', 'Foxdox\DocumentFoxdoxController@listAllDocuments');
    Route::get('retrieveRootFolder', 'Foxdox\DocumentFoxdoxController@retrieveRootFolder');
    Route::get('listFolders', 'Foxdox\DocumentFoxdoxController@listFolders');
    Route::post('listDocuments', 'Foxdox\DocumentFoxdoxController@listDocuments');
    Route::post('downloadDocument', 'Foxdox\DocumentFoxdoxController@downloadDocument');

  
});