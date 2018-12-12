import {store } from '../store.js';


var path = '/api/foxdoxapi/user';

import axios from 'axios';

class FoxdoxApi {
  
  getProviderList() {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('bearer')
      }
    };

    console.log('Getting Provider List');

    axios.get(path+'/listprovidersforoverview', config)
      .then(response => {
        console.log('Listing Providers...');
        var providerlist = response.data['Items'];
        var responseList = [];
        for (var i = 0; i < providerlist.length; i++) {
          var providerListElem = new Object();
          providerListElem.id = '' + i;
          providerListElem.name = providerlist[i];
          providerListElem.documentChats = [];
          responseList.push(providerListElem);
        }
        store.commit('setProviderList', responseList);

        console.log('Got Provider List');
      })
      .catch(error => {
        console.log('Error getting Provider List: '+JSON.stringify(error));
      });

  }
}

export default new FoxdoxApi();