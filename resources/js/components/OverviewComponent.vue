<template>
     <div class="container myCont">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">Overview</div>
                    <div  class="card-body  mx-auto">
                        <ul>
                            <li v-for="provider in providers" v-bind:key="provider.value">
                                {{ provider }}
                                <!-- TODO: Chats anklickbar machen, Pro User nur ein Chat? Mehrere Konversationen zwischen zwei Nutzern -->
                            </li>
                        </ul>
                        <router-link to="/index/nestedzwei">
                            <a class="">Nested Link</a>
                        </router-link>

                        <router-link to="/index/nested">
                            <a class="">root Link</a>
                        </router-link>

                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
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
