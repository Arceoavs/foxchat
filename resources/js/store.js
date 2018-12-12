import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
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
  },
  actions: {
    resetState({ commit }) {
      commit('setProviderList', [
        {
          id: '0',
          name: 'Loading...'
        }
      ])
    }
  }
});

export default store;
