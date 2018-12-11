import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      user: null,
      token: null
    },
    mutations: {
      setUser (state, user) {
        state.user = user;
      },
      setToken (state, token) {
        state.token = token;
      }
    }
});
const providerListStore = new Vuex.Store({
  state: {
    providerList: Object
  },
  getters: {
    getProviderList (state) {
      return state.providerList
    }
  },
  mutations: {
    setProviderList (state, newProviderList) {
      state.providerList = newProviderList;
    }
  }
  // Obvously you would need some mutations and actions,
  // but to make example cleaner I'll skip this part.
});

export default {store, providerListStore};
