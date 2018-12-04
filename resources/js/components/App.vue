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
          <b-nav-item to="/index">
            <div>Dokumente</div>
          </b-nav-item>
          <b-nav-item to="/Chat">
            <div>Chat</div>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto foxcolor max-height-nav" v-show="loggedIn">
          <b-nav-item right class="logout-link">
            <logout-component></logout-component>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--<div class="clearfisx"></div>-->
    <!--<breadcrumb-component></breadcrumb-component>-->
    <!--<footer-component></footer-component>-->
    <router-view></router-view>
  </div>
</template>

<script>
import LogoutComponent from "./LogoutComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";
import FooterComponent from "./Footer.vue";
import BreadcrumbComponent from "./BreadcrumbComponent.vue";
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
  components: {
    LogoutComponent,
    LoadingComponent,
    FooterComponent,
    BreadcrumbComponent
  }
};
</script>
