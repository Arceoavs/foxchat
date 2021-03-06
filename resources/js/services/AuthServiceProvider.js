import EventBus from './event-bus.js';
import ServicesManagementService from './ServicesManagementService.js';
import { store } from '../store.js';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

var path = '/api/auth/provider';

class AuthServiceProvider {
  login(pUsername, pPassword, pXProvider, self) {
    EventBus.$emit('loading');

    console.log('Logging In...');

    var formData = new FormData();
    formData.append('name', pUsername);
    formData.append('password', pPassword);
    formData.append('x-provider', pXProvider);

    self.errorMsg = 'Login Fehler: ';
    self.showAlert = false;
    self.noError = true;

    axios
      .post(path + '/login', formData, config)
      .then(response => {
        console.log('Logging in axios...');
        localStorage.setItem('bearer', response.data.access_token);


        this.retrieveUser(self);

      })
      .catch(error => {
        console.log('error while Login' + JSON.stringify(error));
        self.errorMsg =
          'Login Fehler Token: ' +
          error.response.status +
          error.response.statusText +
          error.response.data.message;
        self.showAlert = true;
        self.noError = !self.showAlert;

        this.logout(self);
      })
      .finally(param => {
        ServicesManagementService.startProviderServicesWithBearer();
        EventBus.$emit('loaded');
      });
  }

  logout(self) {
    EventBus.$emit('loading');
    var path = "/api/auth/provider";
    var formData = new FormData();
    formData.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('bearer')
    );

    var configExt = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + localStorage.getItem('bearer')
      }
    };

    axios
      .post(path + '/logout', formData, configExt)
      .then(response => {
        console.log('Logged Out.');
      })
      .catch(error => {
        console.log('Error logging Out.');
      })
      .finally(param => {
        self.removeProviderServicesAndData();
        self.$router.push('/login/provider');
        EventBus.$emit('loaded');
      });     
  }

  retrieveUser(self) {
    EventBus.$emit('loading');

    console.log('Getting Providerdata...');

    var configExt = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + localStorage.getItem('bearer')
      }
    };
    axios
      .get(path + '/me', configExt)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        store.commit('setUser', response.data);
        console.log('Got Providerdata:');
        console.log(JSON.stringify(localStorage.getItem('user')));

        // if( self.noError  ){
        //     self.$router.push('/');
        //     console.log('Logged In.');
        // }
      })
      .catch(error => {
        this.logout(self);
        console.log(
          'error while fetching Providerdata' + JSON.stringify(error)
        );
        self.errorMsg =
          'Login Fehler User: ' +
          error.response.status +
          error.response.statusText +
          error.response.data.message;
        self.showAlert = true;
        self.noError = !self.showAlert;
      })
      .finally(param => {
        self.$router.push({name: "Chat Foxdox Provider Overview"});
        ServicesManagementService.startProviderServicesWithUserInformation();
        EventBus.$emit('loaded');
        EventBus.$emit('UserData loaded');
      });
  }
}

const auth = new AuthServiceProvider();
export default auth;
