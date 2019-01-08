<template>
  <div>
    <loading-component></loading-component>
    <b-navbar toggleable="md" class="navbar-laravel">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">
        <img class="img-logo" src="/img/FoxdoxChat.png">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-show="loggedIn">
          <b-nav-item to="/">
            <p v-text="$ml.get('dokumente')"/>
          </b-nav-item>
          <b-nav-item to="/chat">
            <div>
              <p v-text="$ml.get('chat')"/>
            </div>
          </b-nav-item>
        </b-navbar-nav>
        <div>
          <button v-for="lang in $ml.list" :key="lang" @click="$ml.change(lang)" v-text="lang"/>
        </div>
        <b-navbar-nav class="ml-auto sm-1 foxcolor max-height-nav" v-show="loggedIn">
          <logout-component></logout-component>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--<div class="clearfisx"></div>-->
    <router-view></router-view>
    <b-row class="mt-5"></b-row>
    <footer-component></footer-component>
  </div>
</template>

<script>
import LogoutComponent from "./authentication/LogoutComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";
import FooterComponent from "./Footer.vue";
import BreadcrumbComponent from "./BreadcrumbComponent.vue";
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
    FooterComponent,
    BreadcrumbComponent
  }
};
</script>
