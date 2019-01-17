<?php
namespace App\Services;
 
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FoxdoxApiClient;
use App\Exceptions\ChatAuthException;

use Illuminate\Support\Facades\Log;

class DocumentAPIService extends Controller
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
        // NON NUMERIC VALUE APPEARED???
        $url = 'https://api.foxdox.de/document/getdoc?id=' + $documentId;
        $foxdoxapiclient = new FoxdoxApiClient($url, ['documentId' => $documentId]);
        $foxdoxapiclient->setMethod('GET');
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    public function publishDocument($documentId)
    {
        $url = 'https://api.foxdox.de/document/publish';
        $foxdoxapiclient = new FoxdoxApiClient($url, ['documentId' => $documentId, 'isPublic' => 'true']);
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

    public function downloadPublicDocument($documentId)
    {
        $url = 'https://api.foxdox.de/Public/document/'. $documentId;
        $foxdoxapiclient = new FoxdoxApiClient($url, []);
        $foxdoxapiclient->setMethod('GET');
        return $foxdoxapiclient->apiRequest(auth()->user()->name);
    }

}