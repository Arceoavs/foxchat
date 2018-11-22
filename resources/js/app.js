// stock
require('./bootstrap');

window.Vue = require('vue');
window.user = null;

// custom
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';

import store from './store.js';
import router from './router.js';
import OverviewComponent from './components/OverviewComponent.vue';
import ChatComponent from './components/ChatComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import App from './components/App.vue';


Vue.use(BootstrapVue);

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App></App>',
    components: { App }
});