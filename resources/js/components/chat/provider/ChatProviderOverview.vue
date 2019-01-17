<template>
  <chat-provider-component v-on:chat-partner-changed="changeRoute"></chat-provider-component>
</template>

<script>
import ChatProviderComponent from "./ChatProviderComponent.vue";
import FoxdoxSubscriberService from "../../../services/FoxdoxSubscriberService.js";
import ChatService from "../../../services/ChatService";

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
      this.$router.push({
        name: "ChatViewProvider",
        query: { partner: e.partner, tag: e.tag }
      });
    },
    changeRoute(e) {
      this.$router.push({
        name: "ChatViewProvider",
        query: { partner: e.partner, tag: e.tag }
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
