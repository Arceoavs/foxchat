// stock
require('./bootstrap');
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
// Root Vue file for the project
import App from './App.vue';
// Vuex Store for state management
import Vuex from 'vuex'
// BootstrapVue for layout and design 
import BootstrapVue from 'bootstrap-vue';
// Custom module for the chat windows
import Chat from 'vue-beautiful-foxchat';

import store from './store.js';
import router from './router.js';

// import only the fontawesome icons that are necessary
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
library.add(faCoffee, faAngleRight, faComments, faPlusCircle, faFile, faFolderOpen, faShareSquare);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

// multilanguage support
import './ml';
import Toasted from 'vue-toasted';

// Because of the modular structure
Vue.use(BootstrapVue);
Vue.use(Chat);
Vue.use(Vuex);
Vue.use(Toasted, {
  iconPack: 'custom-class' // set your iconPack, defaults to material. material|fontawesome|custom-class
});

//dom.watch();
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
