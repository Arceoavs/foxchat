// stock
require('./bootstrap');

// custom
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import Vue from 'vue';
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue';
import Chat from 'vue-beautiful-foxchat';
import store from './store.js';
import router from './router.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { dom } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faAngleRight,
  faComments,
  faPlusCircle,
  faFile,
  faFolderOpen,
  faShareSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './ml';
import Toasted from 'vue-toasted';

Vue.use(BootstrapVue);
Vue.use(Chat);
Vue.use(Vuex);
Vue.use(Toasted, {
  iconPack: 'custom-class' // set your iconPack, defaults to material. material|fontawesome|custom-class
});



Vue.component('font-awesome-icon', FontAwesomeIcon);

library.add(faCoffee, faAngleRight, faComments, faPlusCircle, faFile, faFolderOpen, faShareSquare);
dom.watch();
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App></App>',
  components: { App }
});
