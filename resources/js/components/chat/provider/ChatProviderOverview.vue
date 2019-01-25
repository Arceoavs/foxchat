<template>
  <chat-provider-component v-on:chat-partner-changed="changeRoute"></chat-provider-component>
</template>

<script>
import ChatProviderComponent from "./ChatProviderComponent.vue";
import FoxdoxSubscriberService from "../../../services/FoxdoxSubscriberService.js";
import ChatService from "../../../services/ChatService";
import { store } from "../../../store.js";

export default {
  data() {
    return {
      addChat: "Neuen Chat starten"
    };
  },
  created() {
    ChatService.getInboxProvider();
    FoxdoxSubscriberService.getSubscriberList();
  },
  computed: {},
  methods: {
    informChatComponent(e) {
      var communicationUrl = { userName: e.userName, conversationTag: e.tag };
      store.commit("setCommunicationUrl", communicationUrl);
      this.$router.push({
        name: "ChatViewProvider"
      });
    },
    changeRoute(e) {
      var communicationUrl = { userName: e.userName, conversationTag: e.tag };
      store.commit("setCommunicationUrl", communicationUrl);
      this.$router.push({
        name: "ChatViewProvider"
      });
    }
  },
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
