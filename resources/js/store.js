import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * This store uses VueX to provide a location for
 * saving and accessing values relevant to the current user session.
 * Vuex will store json objects to browsers Session Storage and persisting
 * them to LocalStorage. When session Storage is cleared
 * Vuex will first look up for store in Local Storage.
 */
export const store = new Vuex.Store({

  //state defines stores structure
  //if you want to save data to this store
  //a matching property owned by state must be 
  //existent
  state: {
    // All messages of the current user (if logged in as provider)
    inboxForUser: [
      {
        ProviderShortName: 'Loading...'
      }
    ],
    subscriberList: [
    ],
    // All messages of the current user (if logged in as provider)
    inboxForProvider: [
      {
        document: 'Loading...'
      }
    ],
    // The current user
    user: {},
    toastUrl: { senderName: "", conversationTag:"" },
    communicationUrl: { userName: "", conversationTag:"" },
    // The folder id of the users root folder
    userRootFolder: [],
    // The docuements located in the users root folder
    recentDocuments: {
      Name: 'Loading...'
    },
    // The last 5 documents that were added to the account
    lastFiveDocuments: [],
    // The list of all of the messages of a given chat
    messageList: [],
    // The subfolders located in the users root folder
    recentFolders: [],
    // The subfolders located in folder that the user has currently navigated to
    currentFolder: [],
    // The documents located in folder that the user has currently navigated to
    currentDocuments: []
  },

  //loading plugins, for persisting state to Local storage
  plugins: [createPersistedState()],

  //getters for stores attributes
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

  //setters for stores attributes
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

  //defining reset operations -> setting default value of current attribute
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
