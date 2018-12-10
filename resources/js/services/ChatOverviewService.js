const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('bearer')
  }
};

var path = '/api/foxdoxapi/user/listprovidersforoverview';

import axios from 'axios';

export function returnProviderList() {
  console.log('Listing Providers...');

  return axios.get(path, config).then(response => response.data);
}
