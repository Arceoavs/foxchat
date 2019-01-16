import axios from 'axios';
import Folder from '../model/folder.js';
import Document from '../model/document.js';
import { stringify } from 'querystring';

var configExt = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('bearer')
  }
};

var path = '/api/foxdoxapi/user';

class DocumentService {
  refresh() {
    configExt.headers.Authorization =
      'Bearer ' + localStorage.getItem('bearer');
  }

  downloadDocument(documentId) {
    this.refresh();

    var body = { documentId: documentId };

    axios
      .post(path + '/downloaddocument', body, configExt)
      .then(response => {
        console.log('Downloading document ' + documentId + ' . . .');
        console.log(JSON.stringify(response.data));
        console.log('Got document');
      })
      .catch(error => {
        console.log('Error getting document: ' + JSON.stringify(error));
      });
  }
  getProviderName(path) {
    return path.split("/")[1];
  }

  async publishDocument(documentId) {
    this.refresh();
    var body = { documentId: documentId };

    try {
      const response = await axios
        .post(path + '/publishdocument', body, configExt)
        .then(response => {
          console.log('Publishing document ' + documentId + ' . . .');
          console.log(JSON.stringify(response.data.PublicUrl));
          console.log('Document published!');
        })
    } catch (error) {
      console.log("Error publishing document: " + JSON.stringify(error))
    }

  }

  downloadPublicDocument(documentId) {
    this.refresh();

    var body = { documentId: documentId };

    axios
      .get(path + '/downloadpublicdocument', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('bearer')
        },
        params: {
          documentId: documentId
        }
      })
      .then(response => {
        console.log('Downloading public document ' + documentId + ' . . .');
        console.log(JSON.stringify(response.data));
        console.log('Document downloaded!');
      })
      .catch(error => {
        console.log('Error downloading public document: ' + JSON.stringify(error));
      });

    // axios
    //   .post(path + '/downloadpublicdocument', body, configExt)
    //   .then(response => {
    //     console.log('Downloading public document ' + documentId + ' . . .');
    //     console.log(JSON.stringify(response.data));
    //     console.log('Document downloaded!');
    //   })
    //   .catch(error => {
    //     console.log('Error downloading public document: ' + JSON.stringify(error));
    //   });
  }
}


export default new DocumentService();
