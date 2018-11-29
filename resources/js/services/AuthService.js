import EventBus from './event-bus.js';

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}


class AuthService {
    login(pUsername, pPassword, self){
        EventBus.$emit('loading');

        console.log('Logging In...');
            
        var formData = new FormData();
        formData.append('name', pUsername);
        formData.append('password', pPassword);

        axios.post('/api/auth/login', formData, config)
            .then(response => {
                console.log('Logging In...');
                localStorage.setItem('bearer', response.data.access_token);

                this.retrieveUser(self);
                
            })
            .catch(error => {
                console.log('error while Login' + JSON.stringify(error));
                self.errorMsg = 'Login Fehler Token: ' + error.response.status + error.response.statusText + error.response.data.message;
                self.showAlert = true;
                self.noError = !self.showAlert;

                this.logout();
            }).finally(param => {
                EventBus.$emit('loaded');
            });
    }

    logout(self){
        EventBus.$emit('loading');

        var formData = new FormData();
        formData.append('Authorization', 'Bearer '+localStorage.getItem('bearer'));

        axios.post('/api/auth/logout', formData, config)
            .then(response => {
                console.log('Logged Out.');
            })
            .catch(error => {
                console.log('Error logging Out.');
            }).finally(param => {
                EventBus.$emit('loaded');
                self.$router.push('/login');
            });
        
        localStorage.removeItem('bearer');
        localStorage.removeItem('user');


        
    }

    retrieveUser(self){
        EventBus.$emit('loading');

        console.log('Getting Userdata...');

        var configExt = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer '+localStorage.getItem('bearer')

            }
        }
        axios.get('/api/auth/me', configExt)
            .then(response => {

                localStorage.setItem('user', JSON.stringify(response.data));

                console.log('Got Userdata:');
                console.log(JSON.stringify(localStorage.getItem('user')));

                if( self.noError  ){
                    self.$router.push('/');
                    console.log('Logged In.');
                }
            })
            .catch(error => {
                this.logout();
                console.log('error while fetching user data' + JSON.stringify(error));
                self.errorMsg = 'Login Fehler User: ' + error.response.status + error.response.statusText + error.response.data.message;
                self.showAlert = true;
                self.noError = !self.showAlert;
            }).finally(param => {
                EventBus.$emit('loaded');
            });
    }
}
            
const auth = new AuthService();
export default auth;