//import EventBus from './event-bus.js';
import Document from '../model/document.js';
import Folder from '../model/folder.js';


const configExt = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+localStorage.getItem('bearer')
    }
}

var path = '/api/document';

class DocumentService  {

    listAllDocuments(){
        axios.post(path+'/listAll', body, configExt)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('error');
        });
    }

    getDocumentsByFolderId(folderId){
        var body = {
            'folderId': folderId
        }

        axios.post(path+'/listFolderContent', body, configExt)
            .then(response => {
                console.log(response.data);
                return response.data.name;
                //return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    download(documentId){
        var body = {
            'documentId': documentId
        }

        axios.post(path+'/download', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

}
            
const doc = new DocumentService();
export default doc;