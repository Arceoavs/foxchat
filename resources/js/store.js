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
    ], user: {}
  },
  plugins: [createPersistedState()],
  getters: {
    getUserInbox(state) {
      return state.inboxForUser;
    },
    getProviderInbox(state) {
      return state.inboxForProvider;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUserInbox(state, newProviderList) {
      state.inboxForUser = newProviderList;
    },
    setProviderInbox(state, newProviderInbox) {
      state.inboxForProvider = newProviderInbox;
    },
    setUser(state, newUser) {
      state.user = newUser;
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
    },
    resetUser({ commit }) {
      commit('setUser', [
        {}
      ])
    },
  }
});

export default store;
