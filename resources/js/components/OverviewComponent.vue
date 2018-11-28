<template>
    <div class="container">
        <h1>Overview</h1>
        <ul>
            <li v-for="provider in providers" v-bind:key="provider.value">
                {{ provider }}
                <!-- TODO: Chats anklickbar machen, Pro User nur ein Chat? Mehrere Konversationen zwischen zwei Nutzern -->
            </li>
        </ul>
    </div>
</template>

<script> 

    // Vue.component('OverviewComponent', 
    export default {
        data: function() {
            return {
                providers: null
            }
        },
        mounted() {
            console.log('Overview Component mounted.');
            axios.get('/api/providers')
                .then(response => (this.providers = response.data))
                .catch(error => console.log('error in provider retrieval') );
        }
    };
    
    // );
</script>
