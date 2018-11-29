// stock
require('./bootstrap');

// custom
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';


import store from './store.js';
import router from './router.js';
import App from './components/App.vue';



Vue.use(BootstrapVue);

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App></App>',
    components: { App }
});