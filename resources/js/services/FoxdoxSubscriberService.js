import { store } from '../store.js';

import axios from 'axios';

/**
 * Service for provider, to list all its subscribers for starting general chat. 
 */
class FoxdoxSubscriberService {

  /**
   * method for accessing backend api and listing all subscribers, which
   * are assigned to the logged in provider and haven't started a general
   * chat yet.
   */
    getSubscriberList() {
        //setting bearer token to identify provider
        var config = {
          headers: {
            'Accept': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('bearer')
          }
        };
        //provider api path
        var path = '/api/foxdoxapi/provider';
    
        console.log('Getting Subscriber List');
    
        //actual request with config previously setted.
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