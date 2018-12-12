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
        this.getInboxList();

        console.log('Got Provider List');
      })
      .catch(error => {
        console.log('Error getting Provider List: ' + JSON.stringify(error));
      });

  }

  getInboxList() {
    var path = '/api/chat/user/getinbox';
    var config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('bearer')
      }
    };

    var jsonsd = {
      'offset': '0',
      'take': '1000'
    }

    console.log('Getting Inbox');

    axios.post(path, jsonsd, config)
      .then(response => {
        console.log('Listing Inbox...');
        var chatList = response.data;
        console.log(chatList);
        var responseChatList = [];
        for (var i = 0; i < chatList.length; i++) {
          var providerListElem = new Object();
          providerListElem.id = '' + i;
          providerListElem.name = chatList[i];
          providerListElem.documentChats = [];
          responseList.push(providerListElem);
        }
        store.commit('setProviderList', responseList);

        console.log('Got Inbox List');
      })
      .catch(error => {
        console.log('Error getting Inbox List: ' + JSON.stringify(error));
      });

  }
}

export default new ChatOverviewAPI();