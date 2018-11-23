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

    //Login requests for FoxdoxProviders
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    //Login requests for FoxdoxProviders

    Route::post('getuserid', 'HomeController@index');
});


Route::get('providers', 'MessageController@allProviders');
Route::get('message/{id}', 'MessageController@chatHistory');
Route::post('message/send', 'MessageController@sendMessage');

Route::group(
    ['middleware' => 'auth:provider',
    'prefix' => 'auth'],
    function($router){
        Route::post('provider/login', 'AuthControllerProvider@login');
});