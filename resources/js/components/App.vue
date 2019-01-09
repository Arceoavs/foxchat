<template>
  <div id="container">
    <loading-component></loading-component>
    <b-navbar toggleable="md" class="navbar-laravel">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">
        <img class="img-logo" src="/img/FoxdoxChat.png">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav-item active v-show="loggedIn" to="/">
          <span class="navbar-element" v-text="$ml.get('dokumente')"/>
        </b-nav-item>
        <b-nav-item v-show="loggedIn" to="/chat">
          <span class="navbar-element" v-text="$ml.get('chat')"/>
        </b-nav-item>
        <b-nav-item v-show="loggedIn" right class="ml-auto" >
          <logout-component></logout-component>
        </b-nav-item>
      </b-collapse>
    </b-navbar>
    <div id="body">
      <router-view></router-view>
    </div>
    <b-row class="mt-5"></b-row>
    <footer-component id="footer"></footer-component>
  </div>
</template>

<script>
import LogoutComponent from "./authentication/LogoutComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";
import FooterComponent from "./Footer.vue";
import EventBus from "../services/event-bus.js";
import { store } from "../store.js";
import { MLBuilder } from "vue-multilanguage";

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
  components: {
    LogoutComponent,
    LoadingComponent,
    FooterComponent
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#container {
  min-height: 100%;
  position: relative;
}
#body {
  padding: 10px;
  padding-bottom: 150px; /*Height of the footer - ÄNDERN FÜR KLEINEREN ABSTAND UNTEN */
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>

