import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    providerList: [
      {
        ProviderShortName: 'Loading...'
      }
    ],
    inboxForProvider:[
      {
        document: 'Loading...'
      }
    ]
  },
  plugins: [createPersistedState()],
  getters: {
    getProviderList(state) {
      return state.providerList;
    },
    getProviderInbox(state) {
      return state.inboxForProvider;
    }
  },
  mutations: {
    setProviderList(state, newProviderList) {
      state.providerList = newProviderList;
    },
    setProviderInbox(state, newProviderInbox) {
      state.inboxForProvider = newProviderInbox;
    }
  },
  actions: {
    resetProviderList({ commit }) {
      commit('setProviderList', [
        {
          ProviderShortName: 'Loading...'
        }
      ])
    },
    resetProviderInbox({ commit }) {
      commit('setProviderInbox', [
        {
          document: 'Loading...'
        }
      ])
    }
  }
});

export default store;
