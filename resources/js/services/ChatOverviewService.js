const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('bearer')
  }
};

var path = '/api/foxdoxapi/user/listprovidersforoverview';

import axios from 'axios';

export function returnProviderList() {
  var providerlist = axios.get(path, config).then(response => {
    console.log('Listing Providers...');
    providerlist = response.data['Items'];
    var responseList = [];
    for (var i = 0; i < providerlist.length; i++) {
      var providerListElem = new Object();
      providerListElem.id = ""+i;
      providerListElem.name = providerlist[i];
      providerListElem.documentChats = [];
      responseList.push(providerListElem);
    }
    console.log(responseList);
    return JSON.stringify(responseList);
  });
}
