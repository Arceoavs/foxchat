<template>
  <!-- The entire Frontend is in here -->
  <div id="container">
    <!-- The "loading" spinning wheel that is overlayed when necessary-->
    <loading-component/>
    <!-- The navigation bar on top of every view-->
    <navbar-component/>
    <!-- Variable content of the site -->
    <div id="body">
      <router-view/>
    </div>
    <!-- Footer bar at the bottom of the page -->
    <footer-component id="footer"/>
  </div>
</template>

<script>
import LoadingComponent from "./components/Loading.vue";
import FooterComponent from "./components/Footer.vue";
import NavbarComponent from "./components/Navbar.vue";
import EventBus from "./services/event-bus.js";
//import { MLBuilder } from "vue-multilanguage";
import ServicesManagementService from "./services/ServicesManagementService";

export default {
  created() {
    if (localStorage.getItem("bearer") != null) {
      if (this.$store.state.user.isProvider == 1) {
        ServicesManagementService.startProviderServicesWithBearer();
        ServicesManagementService.startProviderServicesWithUserInformation();
      } else {
        ServicesManagementService.startUserServicesWithBearer();
        ServicesManagementService.startUserServicesWithUserInformation();
      }
    }
    this.$toasted.register(
      "new_message_received",
      payload => {
        // if there is a message show it with the message
        return payload.message;
      },
      {
        position: "bottom-left",
        type: "default",
        duration: 5000,
        className: ["toast"],
        icon: {
          name: "fas fa-comments mr-2"
        },
        action: {
          text: this.$ml.get("open"),
          onClick: (e, toastObject) => {
            if (this.$store.state.user.isProvider) {
              this.$router.push({
                name: "ChatViewProvider",
                query: {
                  partner: this.$store.state.toastUrl.senderName,
                  tag: this.$store.state.toastUrl.conversationTag
                }
              });
            } else {
              this.$router.push({
                name: "ChatViewUser",
                query: {
                  partner: this.$store.state.toastUrl.senderName,
                  tag: this.$store.state.toastUrl.conversationTag
                }
              });
            }
          }
        }
      }
    );
    EventBus.$on("messageWasReceived", this.toastMessage);
  },
  components: {
    NavbarComponent,
    LoadingComponent,
    FooterComponent
  },
  methods: {
    toastMessage(e) {
      this.$store.state.toastUrl.senderName = e.senderName;
      this.$store.state.toastUrl.conversationTag = e.conversationTag;
      this.$toasted.global.new_message_received({
        message:
          this.$ml.get("new_message_toast") +
          " " +
          this.$store.state.toastUrl.senderName
      });
    }
  },
  beforeDestroy() {
    EventBus.$off("messageWasReceived");
  },
  destroyed() {
    console.log("app destrpyed");
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
  background-color: grey !important;
}
</style>
