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

export default store;