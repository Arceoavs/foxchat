<template>
    <div>
        <loading-component></loading-component>
        <b-navbar toggleable="md" type="dark" class="foxcolor-inverted" >
            <b-navbar-brand to="/">
                <img class="img-logo" src="/img/FoxdoxChat.png" />
            </b-navbar-brand>
            <b-navbar-nav v-show="loggedIn">
                <b-nav-item to="/">
                    <div class="foxcolor-pure">Overview</div>
                </b-nav-item>
                <b-nav-item to="/2ndHome">
                    <div class="foxcolor-pure">Chat</div>
                </b-nav-item>
            </b-navbar-nav>
             <b-navbar-nav class="ml-auto" v-show="loggedIn">
                <b-nav-item right> 
                    <logout-component></logout-component>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import LogoutComponent from "./LogoutComponent.vue";
    import LoadingComponent from "./LoadingComponent.vue";
    import EventBus from '../services/event-bus.js';
    
    export default {
        data:{ function(){ 
                return { loggedIn };
            }
        },
        mounted(){
            EventBus.$on('loading', payload => {
                this.loggedIn = localStorage.getItem('bearer');
            });
        },
        components: {
            LogoutComponent,
            LoadingComponent
        }
    };
</script>