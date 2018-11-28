<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Nahid\Talk\Facades\Talk;
use Auth;
use View;

class MessageController extends Controller
{
    protected $authUser;

    public function __construct()
    {
        $this->middleware('auth');
        Talk::setAuthUserId(Auth::user()->id);

        View::composer('partials.peoplelist', function($view) {
            $threads = Talk::threads();
            $view->with(compact('threads'));
        });
    }

    public function allProviders()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function chatHistory($id)
    {
        $conversations = Talk::getMessagesByUserId($id, 0, 5);
        $user = '';
        $messages = [];
        if(!$conversations) {
            $user = User::find($id);
        } else {
            $user = $conversations->withUser;
            $messages = $conversations->messages;
        }

        if (count($messages) > 0) {
            $messages = $messages->sortBy('id');
        }

        return response()->json($message, 200);
    }

    public function sendMessage(Request $request)
    {
        $rules = [
            'message-data'=>'required',
            '_id'=>'required'
        ];

        $this->validate($request, $rules);

        $body = $request->input('message-data');
        $userId = $request->input('_id');

        if ($message = Talk::sendMessageByUserId($userId, $body)) {
            $html = view('ajax.newMessageHtml', compact('message'))->render();
            return response()->json(['status'=>'success', 'html'=>$html], 200);
        }
 
    }

    public function deleteMessage(Request $request, $id)
    {
        if(Talk::deleteMessage($id)) {
            return response()->json(['status'=>'success'], 200);
        }

        return response()->json(['status'=>'errors', 'msg'=>'something went wrong'], 401);
    }

    public function test(Request $request)
    {
        return response()->json(['status'=>'success'], 200);
    }

    public function tests()
    {
        dd(Talk::channel());
    }
}
