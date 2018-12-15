import axios from 'axios';
import Folder from '../model/folder.js';
import Document from '../model/document.js';

var configExt = {
    headers: {
        'Accept': 'application/json',
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
        console.log('Getting sub folders');

        var formData = new FormData();
        formData.append('folderId', folderId);

        axios.post(path + '/listFolders', formData, configExt)
            .then(response => {
                console.log('Retrieving subfolders...');
                console.log(response.data.Id);
                console.log('Got subfolders');
            })
            .catch(error => {
                console.log('Error getting root folder: ' + JSON.stringify(error));
            });
    }


}
export default new FolderService();