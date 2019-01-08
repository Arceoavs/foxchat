import axios from 'axios';
import Folder from '../model/folder.js';
import Document from '../model/document.js';
import { stringify } from 'querystring';
import EventBus from './event-bus';

var configExt = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
    }
}

var path = '/api/foxdoxapi/user';
var myProviderFolder = 'Meine Provider';

class FolderService {

    refresh() {
        configExt.headers.Authorization = 'Bearer ' + localStorage.getItem('bearer');
    }

    getRootFolder() {
        console.log('Getting root folder');

        axios.get(path + '/retrieverootfolder', configExt)
            .then(response => {
                console.log('Retrieving root folder...');
                console.log(response.data.Id);
                console.log('Got root folder');
                return response.data.Id;
            })
            .catch(error => {
                console.log('Error getting root folder: ' + JSON.stringify(error));
            });

    }

    getProviderFolder() {
        console.log('Getting provider folder');
        // 1 GET ROOT FOLDER
        // 2 GET SUBFOLDERS OF ROOT
        // 3 GET FOLDER ID FOR FOLDER 'Meine Provider'

        // var root = this.getRootFolder();
        var root = '4b6c05d5-02e4-407d-9928-b5a2183d2886';
        
        //var subFolders = this.listSubFolders(root);
        var subFolders = [{"Created":"Wed, 07 Nov 2018 20:39:46 GMT","Modified":"Wed, 07 Nov 2018 20:39:46 GMT","Name":"Fotos","Id":"e90741ae-8b8e-4f7e-90d3-1c57936c700c","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"d02d7f8a-7c6e-47a8-980a-ad46e6c1933d","IsFav":false,"IsShared":false,"Path":"Fotos","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":0},{"Created":"Wed, 07 Nov 2018 20:39:46 GMT","Modified":"Wed, 07 Nov 2018 20:39:46 GMT","Name":"Job","Id":"4798aa78-1275-43d7-9131-7bb8d08bca28","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"b056f2c3-59be-4038-adf3-24728e9376df","IsFav":false,"IsShared":false,"Path":"Job","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":0},{"Created":"Thu, 08 Nov 2018 11:13:42 GMT","Modified":"Fri, 04 Jan 2019 18:04:41 GMT","Name":"Meine Provider","Id":"9469c4f3-a8f0-49bd-8127-e0906b454204","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"00000000-0000-0000-0000-000000000000","IsFav":true,"IsShared":false,"Path":"Meine Provider","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":1},{"Created":"Wed, 07 Nov 2018 20:39:46 GMT","Modified":"Wed, 07 Nov 2018 20:39:46 GMT","Name":"Rechnungen","Id":"fe5d6f21-4d41-47cc-a526-96dec133475c","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"2822007a-9188-41bb-a8b6-09b89211e9a8","IsFav":false,"IsShared":false,"Path":"Rechnungen","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":1},{"Created":"Wed, 07 Nov 2018 20:39:47 GMT","Modified":"Wed, 07 Nov 2018 20:39:47 GMT","Name":"Schriftwechsel","Id":"d0f0ad72-4dee-442a-947e-839804b67651","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"b6704a3c-2cb4-4fd5-9c0f-b9ba0025f3eb","IsFav":false,"IsShared":false,"Path":"Schriftwechsel","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":0},{"Created":"Wed, 07 Nov 2018 20:39:47 GMT","Modified":"Wed, 07 Nov 2018 20:39:47 GMT","Name":"Sonstiges","Id":"60e80b42-0f00-424b-b4dd-722a18b9a8f6","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"b056f2c3-59be-4038-adf3-24728e9376df","IsFav":false,"IsShared":false,"Path":"Sonstiges","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":0},{"Created":"Wed, 07 Nov 2018 20:39:47 GMT","Modified":"Wed, 07 Nov 2018 20:39:47 GMT","Name":"Steuer","Id":"acbdb472-f564-4fa3-88c5-8dd03602adc6","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"dd72a8b7-0558-4c05-a9e2-b595a979ce1b","IsFav":false,"IsShared":false,"Path":"Steuer","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":0},{"Created":"Wed, 07 Nov 2018 20:39:47 GMT","Modified":"Wed, 07 Nov 2018 20:39:47 GMT","Name":"Versicherungen","Id":"ea79f760-3ccb-49da-a958-6a34002c0efc","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"be881675-4a88-4aa4-8e51-965f33907267","IsFav":false,"IsShared":false,"Path":"Versicherungen","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":0},{"Created":"Wed, 07 Nov 2018 20:39:47 GMT","Modified":"Wed, 07 Nov 2018 20:39:47 GMT","Name":"Verträge","Id":"308c6843-dc5d-4066-a076-933289cbf295","ParentFolderId":"4b6c05d5-02e4-407d-9928-b5a2183d2886","DefaultDocTypeId":"01060e58-2292-409a-9afb-85905b98d8c1","IsFav":false,"IsShared":false,"Path":"Verträge","IsAuditProof":false,"AuditProofUntil":"","DocumentCount":0,"FolderCount":0}];


        // LOOK FOR MYPROVIDER FOLDER IN SUBFOLDERS OF ROOT
        for (let index = 0; index < subFolders.length; index++) {
            if (subFolders[index].Name == myProviderFolder) {
                console.log(subFolders[index].Id);
                return subFolders[index].Id;
            }
        }
        console.log('Found myprovider folder')
    }

    listSubFolders(folderId) {
        this.refresh();

        var body = { 'folderId': folderId };

        axios.post(path + '/listfolders', body, configExt)
            .then(response => {
                console.log('Retrieving subfolders of ' + folderId + ' . . .');
                console.log(JSON.stringify(response.data.Items));
                console.log('Got subfolders');
                return response.data.Items;
            })
            .catch(error => {
                console.log('Error getting subfolders: ' + JSON.stringify(error));
            });
    }

    listDocuments(folderId) {
        this.refresh();

        var body = { 'folderId': folderId };

        axios.post(path + '/listdocuments', body, configExt)
            .then(response => {
                console.log('Retrieving documents of ' + folderId + ' . . .');
                console.log(JSON.stringify(response.data.Items));
                console.log('Got documents');
                return response.data.Items;
            })
            .catch(error => {
                console.log('Error getting subfolders: ' + JSON.stringify(error));
            });
    }


}
export default new FolderService();