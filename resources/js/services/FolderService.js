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

class FolderService {

    refresh() {
        configExt.headers.Authorization = 'Bearer ' + localStorage.getItem('bearer');
    }

    getRootFolder() {
        console.log('Getting root folder');

        axios.get(path + '/retrieveRootFolder', configExt)
            .then(response => {
                console.log('Retrieving folder...');
                console.log(response.data.Id);
                console.log('Got root folder');
            })
            .catch(error => {
                console.log('Error getting root folder: ' + JSON.stringify(error));
            });

    }

    // Angeblich werden irgendwo zu wenige Parameter übergeben
    listSubFolders(folderId) {
        this.refresh();
        console.log('Getting sub folders for ' + folderId);

        var f = folderId.toString()
        var body = {'folderId': 'e90741ae-8b8e-4f7e-90d3-1c57936c700c'};

        console.log('Request body: ' + body);
        axios.post(path + '/listFolders', body, configExt)
            .then(response => {
                console.log('Retrieving subfolders...');
                console.log(response.data);
                console.log('Got subfolders');
            })
            .catch(error => {
                console.log('Error getting subfolders: ' + JSON.stringify(error));
            });
    }


}
export default new FolderService();