import axios from 'axios';
import store from '../store';

var configExt = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('bearer')
  }
};

var path = '/api/foxdoxapi/user';
var myProviderFolder = 'Meine Provider';

export default class FolderService {
  refresh() {
    configExt.headers.Authorization =
      'Bearer ' + localStorage.getItem('bearer');
  }

  async getRootFolder() {
    this.refresh();
    try {
      const response = await axios.get(path + '/retrieverootfolder', configExt);
      console.log('Retrieving root folder...');
      console.log(response.data);
      console.log('Got root folder');
      store.commit('setRootFolder', response.data);
      this.getSubFolders(response.data.Id, true);
      this.getDocuments(response.data.Id, true);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Gets Subfolders of the parent folder of which the ID is given.
   * When getting subfolders of root folder, the subfolders are stored in userRootFolder in store (permanently)
   * Otherwise all other folders are stored in currentFolder
   */
  async getSubFolders(folderId, gettingRoot = false) {
    this.refresh();
    var body = { folderId: folderId };
    try {
      const response = await axios.post(path + '/listfolders', body, configExt);
      console.log('Retrieving subfolders of ' + folderId + ' . . .');
      //If getting root subfolders: store in recentFolders
      if (gettingRoot) store.commit('setRecentFolders', response.data);
      //Otherwise: store in currentFolder
      else store.commit('setCurrentFolder', response.data.Items);
      console.log('Got subfolders');
      //console.log(store.state.currentFolder);
    } catch (error) {
      console.log('Error getting subfolders: ' + error);
    }
  }

  getProviderFolder() {
    console.log('Getting provider folder');
    // 1 GET ROOT FOLDER
    // 2 GET SUBFOLDERS OF ROOT
    // 3 GET FOLDER ID FOR FOLDER 'Meine Provider'

    //var root = this.getRootFolder();
    //var root = '4b6c05d5-02e4-407d-9928-b5a2183d2886';
    var subFolders = store.state.recentDocuments;

    // LOOK FOR MYPROVIDER FOLDER IN SUBFOLDERS OF ROOT
    for (let index = 0; index < subFolders.length; index++) {
      if (subFolders[index].Name == myProviderFolder) {
        console.log(subFolders[index].Id);
        return subFolders[index].Id;
      }
    }
    console.log('Found myprovider folder');
  }

  async getDocuments(folderId, gettingRoot = false) {
    this.refresh();
    var body = { folderId: folderId };

    try {
      const response = await axios.post(
        path + '/listdocuments',
        body,
        configExt
      );
      console.log('Retrieving documents of ' + folderId + ' . . .');
      console.log(JSON.stringify(response.data));
      console.log('Got documents');
      if (gettingRoot) store.commit('setRecentDocuments', response.data.Items);
      else store.commit('setCurrentDocuments', response.data.Items);
    } catch (error) {
      console.log('Error getting subfolders: ' + error);
    }
  }
}
