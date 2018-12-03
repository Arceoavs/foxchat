<template>
  <div>
    <loading-component></loading-component>
    <header-component></header-component>
    <!--<div class="clearfisx"></div>-->
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import LogoutComponent from "./LogoutComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";
import HeaderComponent from "./Header.vue";
import FooterComponent from "./Footer.vue";
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
    HeaderComponent
  }
};
</script>
