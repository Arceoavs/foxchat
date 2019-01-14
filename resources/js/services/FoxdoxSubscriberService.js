import { store } from '../store.js';

import axios from 'axios';

class FoxdoxSubscriberService {
    getSubscriberList() {
        var config = {
          headers: {
            'Accept': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('bearer')
          }
        };
        var path = '/api/foxdoxapi/provider';
    
        console.log('Getting Subscriber List');
    
        axios.get(path + '/listSubscribersWithoutGeneralChat', config)
          .then(response => {
            console.log('Listing Subscribers...');
            store.commit('setSubscriberList', response.data);
    
            console.log('Got Subsriber List');
          })
          .catch(error => {
            console.log('Error getting Subscriber List: ' + JSON.stringify(error));
          });
      }
}

export default new FoxdoxSubscriberService();