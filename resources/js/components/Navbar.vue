<template>
<!-- Die Navigationsbar wird auf jeder Seite oben angezeigt. -->
  <b-navbar toggleable="md" class="navbar-laravel">
    <!-- Wenn das Broswefenster schmal ist (beispielsweise in der mobilen Ansicht) wird ein Ausklapp- Knopf angezeigt -->
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <!-- Das foxchat Logo dient gleichzeitig als Link zur Homepage -->
    <b-navbar-brand to="/homepage">
      <img class="img-logo" src="/img/FoxdoxChat.png">
    </b-navbar-brand>
    <!-- Alle Elemente innerhalb dieses Tags werden bei schmalen Browserfenstern eingeklappt -->
    <b-collapse is-nav id="nav_collapse">
      <!-- Die Navigation zu den Dokumenten wird angezeigt, wenn der Benutzer als Client angemeldet ist -->
      <b-nav-item v-show="loggedIn && !isProvider" to="/Documents">
        <span class="navbar-element" v-text="$ml.get('dokumente')"/>
      </b-nav-item>
      <!-- Die Navigation zu den Chats wird angezeigt, wenn der Benutzer angemeldet ist -->
      <b-nav-item v-show="loggedIn" v-bind:to="chatUrl">
        <span class="navbar-element" v-text="$ml.get('chat')"/>
      </b-nav-item>
      <!-- Der logout - Knopf wird nur angezeigt, wenn der Benutzer angemeldet ist -->
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
    // Im Store ist gespeichert, ob es sich bei dem angelemdeten Benutzer um einen Provider handelt
    isProvider() {
      return this.$store.state.user.isProvider;
    },
    // Wenn der angemeldete Benutzer ein Provider ist, verändert sich die route
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
