import { store } from '../store.js';
import ChatService from "./ChatService";

import axios from 'axios';

class ChatOverviewAPI {
  getProviderList() {
    var config = {
      headers: {
        'Accept': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('bearer')
      }
    };
    var path = '/api/foxdoxapi/user';

    console.log('Getting Provider List');

    axios.get(path + '/listprovidersforoverview', config)
      .then(response => {
        console.log('Listing Providers...');
        store.commit('setUserInbox', response.data);

        console.log('Got Provider List');
      })
      .catch(error => {
        console.log('Error getting Provider List: ' + JSON.stringify(error));
      }).finally(param => {
        ChatService.getInbox();
      });
  }
}

export default new ChatOverviewAPI();