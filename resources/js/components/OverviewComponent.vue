<template>
    <div class="container">
        <ul>
            <li v-for="provider in providers">
                {{ provider }}
            </li>
        </ul>
    </div>
</template>

<script> 
    var Vue = require('vue');

    // Vue.component('OverviewComponent', 
    export default {
        data: function() {
            return {
                providers: null
            }
        },
        mounted() {
            console.log('Component mounted.');
            axios.get('/api/providers')
                .then(response => (this.providers = response.data))
                .catch(error => console.log('error in provider retrieval') );
        }
    };
    
    // );
</script>
