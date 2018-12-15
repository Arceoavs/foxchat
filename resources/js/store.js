import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    inboxForUser: [
      {
        ProviderShortName: 'Loading...'
      }
    ],
    inboxForProvider: [
      {
        document: 'Loading...'
      }
    ]
  },
  plugins: [createPersistedState()],
  getters: {
    getUserInbox(state) {
      return state.inboxForUser;
    },
    getProviderInbox(state) {
      return state.inboxForProvider;
    }
  },
  mutations: {
    setUserInbox(state, newProviderList) {
      state.inboxForUser = newProviderList;
    },
    setProviderInbox(state, newProviderInbox) {
      state.inboxForProvider = newProviderInbox;
    }
  },
  actions: {
    resetUserInbox({ commit }) {
      commit('setUserInbox', [
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
