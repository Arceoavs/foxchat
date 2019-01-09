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
    ],
    user: {},
    userRootFolder: [],
    recentDocuments: {
      Name: 'Loading...'
    },
    recentFolders: [],
    currentFolder: [],
    currentDocuments: []
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
    },
    getRecentDocuments(state) {
      return state.recentDocuments;
    },
    getRecentFolders(state) {
      return state.recentFolders;
    },
    getUserRootFolder(state) {
      return state.userRootFolder;
    },
    getCurrentFolder(state) {
      return state.currentFolder;
    },
    getCurrentDocuments(state) {
      return state.currentDocuments;
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
    },
    setRecentDocuments(state, newDocumentList) {
      state.recentDocuments = newDocumentList;
    },
    setRecentFolders(state, newFolderList) {
      state.recentFolders = newFolderList;
    },
    setRootFolder(state, newRootFolder) {
      state.userRootFolder = newRootFolder;
    },
    setCurrentFolder(state, newCurrentFolder) {
      state.currentFolder = newCurrentFolder;
    },
    setCurrentDocuments(state, newCurrentDocuments) {
      state.currentDocuments = newCurrentDocuments;
    }
  },
  actions: {
    resetUserInbox({ commit }) {
      commit('setUserInbox', [
        {
          ProviderShortName: 'Loading...'
        }
      ]);
    },
    resetProviderInbox({ commit }) {
      commit('setProviderInbox', [
        {
          document: 'Loading...'
        }
      ]);
    },
    resetUser({ commit }) {
      commit('setUser', [{}]);
    },
    resetRootFolder({ commit }) {
      commit('setRootFolder', [{}]);
    },
    resetRecentFolders({ commit }) {
      commit('setRecentFolders', [{}]);
    },
    resetRecentDocuments({ commit }) {
      commit('setRecentDocuments', [{}]);
    },
    resetCurrentFolder({ commit }) {
      commit('setCurrentFolder', [{}]);
    },
    resetCurrentDocuments({}) {
      commit('setCurrentDocuments', [{}]);
    }
  }
});

export default store;
