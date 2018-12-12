import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; 

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    providerList: [
      {
        id: '0',
        name: 'Loading...'
      }
    ]
  },
  plugins: [createPersistedState()],
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
