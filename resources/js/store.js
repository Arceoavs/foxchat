import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    providerList: Object
  },
  getters: {
    getProviderList(state) {
      return state.providerList;
    }
  },
  mutations: {
    setProviderList(state, newProviderList) {
      state.providerList = newProviderList;
    }
  }
  // Obvously you would need some mutations and actions,
  // but to make example cleaner I'll skip this part.
});
