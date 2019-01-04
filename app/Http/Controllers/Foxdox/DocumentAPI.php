<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\DocumentAPIService as DocumentAPIService;
use Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use App\Exceptions\ChatAuthException;

class DocumentAPI extends Controller
{
    protected $documentapiservice;
    public function __construct()
    {
        if($this->validateUserAsUser()){
            $this->documentapiservice = new DocumentAPIService();
        }
        $this->middleware('auth:api');
    }

    public function validateUserAsUser()
    {
        if(auth()->user()->isProvider==0){
            return true;
        }else{
            throw new ChatAuthException("You are not a Foxdox User.");
        }
    }

    public function listFolders()
    {
        //Check if request contains the necessary inputs
        $validator = Validator::make(request()->all(), [
            'folderId' => 'required',
        ]);

        //Send errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        //Get all the informations from the request
        $folder = request()->input('folderId');

        return $this->documentapiservice->listFolders($folder);
    }
}
