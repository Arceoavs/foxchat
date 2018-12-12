import { store } from '../store.js';

import axios from 'axios';

class ChatOverviewAPI {
  getProviderList() {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('bearer')
      }
    };
    var path = '/api/foxdoxapi/user';

    console.log('Getting Provider List');

    axios.get(path + '/listprovidersforoverview', config)
      .then(response => {
        console.log('Listing Providers...');
        store.commit('setProviderList', response.data);
        this.getInboxList();
        console.log('Got Provider List');
      })
      .catch(error => {
        console.log('Error getting Provider List: ' + JSON.stringify(error));
      });
  }
}

export default new ChatOverviewAPI();