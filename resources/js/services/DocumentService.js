import axios from 'axios';

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

  downloadDocument(documentId, documentName) {
    this.refresh();

    var body = { documentId: documentId };

    axios
      .post(path + '/downloaddocument', body, configExt)
      .then(response => {
        console.log('Downloading document ' + documentId + ' . . .');
        console.log(JSON.stringify(response.data));

        // const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a');
        link.href = response.data;
        link.setAttribute('download', documentName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Got document');
      })
      .catch(error => {
        console.log('Error getting document: ' + JSON.stringify(error));
      });
  }
  getProviderName(path) {
    if(path) return path.split("/")[1];
  }

  async publishDocument(documentId) {
    this.refresh();
    var body = { documentId: documentId };

    try {
      const response = await axios.post(path + '/publishdocument', body, configExt)
      console.log('Publishing document ' + documentId + ' . . .');
      console.log(JSON.stringify(response.data.PublicUrl));
      console.log('Document published!');
      return response.data.PublicUrl;
    } catch (error) {
      console.log("Error publishing document: " + JSON.stringify(error))
    }

  }

}


export default new DocumentService();
