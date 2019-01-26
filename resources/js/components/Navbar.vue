<template>
  <b-navbar toggleable="md" class="navbar-laravel">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/homepage">
      <img class="img-logo" src="/img/FoxdoxChat.png">
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-nav-item v-show="loggedIn && !isProvider" to="/Documents">
        <span class="navbar-element" v-text="$ml.get('dokumente')"/>
      </b-nav-item>
      <b-nav-item v-show="loggedIn" v-bind:to="chatUrl">
        <span class="navbar-element" v-text="$ml.get('chat')"/>
      </b-nav-item>
      <b-nav-item v-show="loggedIn" right class="ml-auto">
        <logout-component></logout-component>
      </b-nav-item>
    </b-collapse>
  </b-navbar>
</template>

<script>
import LogoutComponent from "./auth/LogoutComponent.vue";
import EventBus from "../services/event-bus.js";
export default {
  data: function() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    this.loggedIn = localStorage.getItem("bearer");
    EventBus.$on("loading", payload => {
      this.loggedIn = localStorage.getItem("bearer");
    });
    EventBus.$on("loaded", payload => {
      this.loggedIn = localStorage.getItem("bearer");
    });
  },
  computed: {
    isProvider() {
      return this.$store.state.user.isProvider;
    },
    chatUrl() {
      if (this.$store.state.user.isProvider == 1) {
        return "/provider-chat";
      } else return "/chat";
    }
  },
  components: {
    LogoutComponent
  }
};
</script>
