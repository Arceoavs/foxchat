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
<style>
    .myCont {
        padding: 10px;
    }
</style>

<script>
    var Vue = require('vue');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const self = this;

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
                var formData = new FormData();
                formData.append('name', this.username);
                formData.append('password', this.password);
                
                axios.post('/api/auth/login', formData, config)
                    .then(response => {
                        this.$store.commit('setToken', response.data);
                        this.retrieveUser();
                        console.log('Logged In.');
                        self.$router.psuh('/');
                    })
                    .catch(error => console.log('error while Login' + JSON.stringify(error)) );
            },
            retrieveUser: function(){
                var formData = new FormData();
                formData.append('token', this.$store.state.token.access_token);

                axios.post('/api/auth/me', formData, this.config)
                    .then(response => {
                        this.$store.commit('setUser', response.data);
                        console.log('Got Userdata.');
                    })
                    .catch(error => console.log('error while fetching user data' + JSON.stringify(error)));
            }

        },
        mounted() {
            console.log('Component mounted.')            
        }
    };
</script>
