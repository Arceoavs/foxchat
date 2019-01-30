<template>
  <chat-provider-component v-on:chat-partner-changed="changeRoute"></chat-provider-component>
</template>

<script>
import ChatProviderComponent from "./ChatProviderComponent.vue";
import FoxdoxSubscriberService from "../../../services/FoxdoxSubscriberService.js";
import ChatService from "../../../services/ChatService";
//This component will be included in the providers's chat overview.
export default {
  //When the component will be created the provider's inbox und subscriber's are requested.
  created() {
    ChatService.getInboxProvider();
    FoxdoxSubscriberService.getSubscriberList();
  },
  methods: {
    //If one of the child components emitted the change route event, here the routing will be done to the communication page.
    changeRoute(e) {
      var communicationUrl = { userName: e.userName, conversationTag: e.tag };
      this.$store.commit("setCommunicationUrl", communicationUrl);
      this.$router.push({
        name: "ChatViewProvider"
      });
    }
  },
  //The components used.
  components: {
    ChatProviderComponent
  }
};
</script>

<style>
.chatIcon {
  min-width: 3em;
}
.right {
  float: right;
}
.left {
  float: left;
}
</style>
