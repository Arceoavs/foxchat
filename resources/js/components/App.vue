<template>
  <div id="container">
    <loading-component></loading-component>
    <b-navbar toggleable="md" class="navbar-laravel">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">
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
    <div id="body">
      <router-view></router-view>
    </div>
    <!-- <b-row class="mt-5"></b-row> -->
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
import ServicesManagementService from "../services/ServicesManagementService";

export default {
  data: function() {
    return {
      loggedIn: false
    };
  },
  created() {
    if (localStorage.getItem("bearer") != null) {
      if (store.state.user.isProvider == 1) {
        ServicesManagementService.startProviderServicesWithBearer();
        ServicesManagementService.startProviderServicesWithUserInformation();
      } else {
        ServicesManagementService.startUserServicesWithBearer();
        ServicesManagementService.startUserServicesWithUserInformation();
      }
    }
    this.$toasted.register(
      "new_message_received",
      "New message was received.",
      {
        type: 'info',
        duration: 3000,
        iconPack: 'fontawesome',
        className: ['toast',],
        icon: 'message'
      }
    );
    EventBus.$on("messageWasReceived", payload => {
      this.$toasted.global.new_message_received();
    });
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
      return store.state.user.isProvider;
    },
    chatUrl() {
      if (store.state.user.isProvider == 1) {
        return "/provider-chat";
      } else return "/chat";
    }
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
  padding-bottom: 105px;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.toast {
  background-color: #f86a2d !important;
}
</style>

