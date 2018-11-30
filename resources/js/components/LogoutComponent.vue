<template>
    <a class="foxcolor" v-on:click="logout()" >Logout</a>
</template>

<script>
    import auth from '../services/AuthService.js';

    export default {
        methods: {
            logout: function(){
                console.log('Logging Out...');
                auth.logout(this);
            }
        },
        mounted() {
            console.log('Login Component mounted.')            
        }
    };
</script>
