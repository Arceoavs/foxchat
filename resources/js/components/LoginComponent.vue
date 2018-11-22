<template>
    <div class="container myCont">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>

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

    
    
    export default {
        data: function() {
            return {
                username: 'manuel.barkau',
                password: '011235813',
                token: ''
            }
        },
        methods: {
            sendPassword: function(){

                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                var formData = new FormData();
                formData.append('name', this.username);
                formData.append('password', this.password);
                
                axios.post('/api/login', formData, config)
                    .then(response => {
                        console.log( JSON.stringify(response));
                        window.router.next('/');
                    })
                    .catch(error => console.log('error in provider retrieval' + JSON.stringify(error)) );
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    };
</script>
