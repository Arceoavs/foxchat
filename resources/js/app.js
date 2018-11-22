// stock
require('./bootstrap');

window.Vue = require('vue');
window.user = null;

// custom
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import OverviewComponent from './components/OverviewComponent.vue';
import ChatComponent from './components/ChatComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import App from './components/App.vue';


Vue.use(BootstrapVue);
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Overview',
        component: OverviewComponent
    },{
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },{
        path: '/:partner',
        name: 'Chat with Partner',
        component: ChatComponent
    }
]

const router = new VueRouter({
        mode: 'history',
        routes: routes     
});

router.beforeEach((to, from, next) => {
    if(store.user === '') {
        next('/login');
    } else {
        next();
    }
});

var store = {
    state: {
      user: ''
    },
    setUserAction (newValue) {
      this.state.user = newValue
    },
    clearUserAction () {
      this.state.user = ''
    }
  }

const app = new Vue({
    el: '#app',
    router,
    template: '<App></App>',
    components: { App }
});