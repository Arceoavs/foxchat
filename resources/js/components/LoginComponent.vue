<template>
    <div class="container myCont">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <!-- Alert Box bei fehler, und Login ablegen als Cookie  -->
                    <div @keyup.enter="sendPassword()" class="card-body">
                        <input v-model="username" placeholder="Username">
                        <input type="password" v-model="password" placeholder="Password">
                        <button type="button" class="btn foxcolor" v-on:click="sendPassword()" >Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var Vue = require('vue');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    export default {
        data: function() {
            return {
                username: 'manuel.barkau',
                password: '011235813',
                token: '',
            }
        },
        methods: {
            sendPassword: function(){
                console.log('Logging In...');

                var formData = new FormData();
                formData.append('name', this.username);
                formData.append('password', this.password);

                axios.post('/api/auth/login', formData, config)
                    .then(response => {
                        console.log('Saving access token as cookie:');
                        this.$cookies.set('bearer', response.data.access_token);
                        console.log(this.$cookies.get('bearer'));

                        this.retrieveUser();
                        console.log('Logged In.');
                        this.$router.push('/');
                    })
                    .catch(error => console.log('error while Login' + JSON.stringify(error)) );
            },
            retrieveUser: function(){
                console.log('Getting Userdata...');

                var formData = new FormData();
                formData.append('token', this.$cookies.get('bearer'));

                axios.post('/api/auth/me', formData, this.config)
                    .then(response => {
                        this.$cookies.set('user', JSON.stringify(response.data));
                        console.log('Got Userdata:');
                        console.log(JSON.stringify(this.$cookies.get('user')));
                    })
                    .catch(error => console.log('error while fetching user data' + JSON.stringify(error)));
            }

        },
        mounted() {
            console.log('Login Component mounted.')            
        }
    };
</script>
