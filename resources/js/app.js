// stock
require('./bootstrap');

// custom
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Chat from 'vue-beautiful-foxchat';
import store from './store.js';
import router from './router.js';
import App from './components/App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faAngleRight,
  faComments,
  faPlusCircle,
  faFile
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(BootstrapVue);
Vue.use(Chat);



Vue.component('font-awesome-icon', FontAwesomeIcon);

library.add(faCoffee, faAngleRight, faComments, faPlusCircle, faFile);

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App></App>',
  components: { App }
});
