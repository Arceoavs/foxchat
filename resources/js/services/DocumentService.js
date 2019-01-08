import axios from 'axios';
import Folder from '../model/folder.js';
import Document from '../model/document.js';
import { stringify } from 'querystring';

var configExt = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('bearer')
    }
}

var path = '/api/foxdoxapi/user';

class DocumentService {

    refresh() {
        configExt.headers.Authorization = 'Bearer ' + localStorage.getItem('bearer');
    }

    downloadDocument(documentId) {
        this.refresh();

        var body = {'documentId': documentId};

        axios.post(path + '/downloaddocument', body, configExt)
            .then(response => {
                console.log('Downloading document '+ documentId +' . . .');
                console.log(JSON.stringify(response.data));
                console.log('Got document');
            })
            .catch(error => {
                console.log('Error getting document: ' + JSON.stringify(error));
            });
    }


}
export default new DocumentService();