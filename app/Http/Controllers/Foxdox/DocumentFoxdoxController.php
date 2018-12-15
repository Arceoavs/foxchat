<?php

namespace App\Http\Controllers\Foxdox;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;

class DocumentFoxdoxController extends Controller
{
    public function __construct()
    {
        $this->validateUserAsUser();
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

    public function listAllDocuments()
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/document/listalldocs', []);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    public function retrieveRootFolder()
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/folder/rootfolder', []);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    public function listFolders($folderId)
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/folder/listfolders', ['folderId' => $folderId]);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    public function listDocuments($folderId)
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/folder/listdocuments', ['folderId' => $folderId]);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    public function downloadDocument($documentId)
    {
        $foxdoxapiclient = new FoxdoxApiClient('https://api.foxdox.de/document/getdoc', ['documentId' => $documentId]);
        $foxdoxapiclient->setMethod('GET');
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }
}
