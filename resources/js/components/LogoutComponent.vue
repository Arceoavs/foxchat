<template>
    <button type="button" class="btn foxcolor-inverted" v-on:click="logout()" >Logout</button>
</template>

<script>
    import auth from '../services/AuthService.js';

    export default {
        methods: {
            logout: function(){
                console.log('Logging Out...');
                auth.logout();                
                this.$router.push('/login');
            }
        },
        mounted() {
            console.log('Login Component mounted.')            
        }
    };
</script>
