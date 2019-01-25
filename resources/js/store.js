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
    subscriberList: [
    ],
    inboxForProvider: [
      {
        document: 'Loading...'
      }
    ],
    user: {},
    toastUrl: { senderName: "", conversationTag:"" },
    communicationUrl: { userName: "", conversationTag:"" },
    userRootFolder: [],
    recentDocuments: {
      Name: 'Loading...'
    },
    lastFiveDocuments: [],
    messageList: [],
    recentFolders: [],
    currentFolder: [],
    currentDocuments: []
  },
  plugins: [createPersistedState()],
  getters: {
    getUserInbox(state) {
      return state.inboxForUser;
    },
    getToastUrl(state) {
      return state.toastUrl;
    },
    getCommunicationUrl(state) {
      return state.communicationUrl;
    },
    getSubscriberList(state) {
      return state.subscriberList;
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
    getLastFiveDocuments(state) {
      return state.lastFiveDocuments;
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
    },
    getMessageList(state) {
      return state.messageList;
    }
  },
  mutations: {
    setUserInbox(state, newProviderList) {
      state.inboxForUser = newProviderList;
    },
    setToastUrl(state, newToastUrl) {
      state.toastUrl = newToastUrl;
    },
    setCommunicationUrl(state, newCommunicationUrl) {
      state.communicationUrl = newCommunicationUrl;
    },
    setSubscriberList(state, newSubscriberList) {
      state.subscriberList = newSubscriberList;
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
    setLastFiveDocuments(state, newLastFiveList) {
      state.lastFiveDocuments = newLastFiveList;
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
    },
    setMessageList(state, newMessageList) {
      state.messageList = newMessageList;
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
    resetSubscriberList({ commit }) {
      commit('setSubscriberList', []);
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
    resetToastUrl({ commit }) {
      commit('setToastUrl', { senderName: "", conversationTag:"" });
    },
    resetCommunicationUrl({ commit }) {
      commit('setCommunicationUrl', { userName: "", conversationTag:"" });
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
    resetCurrentDocuments({ }) {
      commit('setCurrentDocuments', [{}]);
    },
    resetLastFiveDocuments({ }) {
      commit('setLastFiveDocuments', [{}]);
    },
    resetMessageList({ commit }) {
      commit('setMessageList', []);
    }
  }
});

export default store;
