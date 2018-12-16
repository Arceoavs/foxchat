import EventBus from './event-bus.js';
import FoxdoxGeneralService from './FoxdoxGeneralService';
import BroadcastingService from "../services/BroadcastingService.js";
import { store } from '../store.js';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

var path = '/api/auth/user';

class AuthService {
  login(pUsername, pPassword, self) {
    EventBus.$emit('loading');

    console.log('Logging In...');

    var jsonsd = {
      'name': pUsername,
      'password': pPassword
    }


    var formData = new FormData();
    formData.append('name', pUsername);
    formData.append('password', pPassword);

    self.errorMsg = 'Login Fehler: ';
    self.showAlert = false;
    self.noError = true;

    axios.post(path + '/login', jsonsd, config)
      .then(response => {
        console.log('Logging In...');
        localStorage.setItem('bearer', response.data.access_token);
        this.retrieveUser(self);

        if (self.noError) {
          self.$router.push('/');
          console.log('Logged In');
        }
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
        BroadcastingService.initialize();
        EventBus.$emit('loaded');
        FoxdoxGeneralService.getProviderList();
      });
  }

  logout(self) {
    EventBus.$emit('loading');

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

    axios.post(path + '/logout', formData, configExt)
      .then(response => {
        console.log('Logged Out.');
      })
      .catch(error => {
        console.log('Error logging Out.');
      })
      .finally(param => {
        self.$router.push('/login');
        EventBus.$emit('loaded');
      });
    BroadcastingService.unsubscribeFromChannel();
    localStorage.removeItem('bearer');
    localStorage.removeItem('user');
    store.dispatch('resetUserInbox');
    store.dispatch('resetUser');
  }

  retrieveUser(self) {
    EventBus.$emit('loading');

    console.log('Getting Userdata...');

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
        console.log('Got Userdata:');
        console.log(JSON.stringify(localStorage.getItem('user')));

        // if( self.noError  ){
        //     self.$router.push('/');
        //     console.log('Logged In.');
        // }
      })
      .catch(error => {
        this.logout(self);
        console.log('error while fetching user data' + JSON.stringify(error));
        self.errorMsg =
          'Login Fehler User: ' +
          error.response.status +
          error.response.statusText +
          error.response.data.message;
        self.showAlert = true;
        self.noError = !self.showAlert;
      })
      .finally(param => {
        BroadcastingService.subscribeToChannel();
        EventBus.$emit('loaded');
        EventBus.$emit('UserData loaded');
      });
  }
}

const auth = new AuthService();
export default auth;
