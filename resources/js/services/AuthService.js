const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

class AuthService {
    login(pUsername, pPassword, self){
        console.log('Logging In...');
            
        var formData = new FormData();
        formData.append('name', pUsername);
        formData.append('password', pPassword);

        axios.post('/api/auth/login', formData, config)
            .then(response => {
                console.log('Logging In...');
                self.cookies.set('bearer', response.data.access_token);

                this.retrieveUser(self);
                
                if( self.noError  ){
                    self.$router.push('/');
                    console.log('Logged In.');
                }
            })
            .catch(error => {
                console.log('error while Login' + JSON.stringify(error));
                self.errorMsg = 'Login Fehler Token: ' + error.response.status + error.response.statusText + error.response.data.message;
                self.showAlert = true;
                self.noError = !self.showAlert;

                LogoutComponent.logout();
            });
    }

    logout(self){
        var formData = new FormData();
        formData.append('token', self.cookies.get('bearer'));

        axios.post('/api/auth/logout', formData, config)
            .then(response => {
                console.log('Logged Out.');
            })
            .catch(error => {
                console.log('Error logging Out.');
            });
            
        self.cookies.remove('bearer');
        self.cookies.remove('user');

        self.$router.push('/login');
    }

    retrieveUser(self){
        console.log('Getting Userdata...');

        var configExt = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer '+self.cookies.get('bearer')
            }
        }
        axios.get('/api/auth/me', configExt)
            .then(response => {

                self.cookies.set('user', JSON.stringify(response.data));

                console.log('Got Userdata:');
                console.log(JSON.stringify(self.cookies.get('user')));
            })
            .catch(error => {
                this.logout();
                console.log('error while fetching user data' + JSON.stringify(error));
                self.errorMsg = 'Login Fehler User: ' + error.response.status + error.response.statusText + error.response.data.message;
                self.showAlert = true;
                self.noError = !self.showAlert;
            });
    }
}
            
const auth = new AuthService();
export default auth;