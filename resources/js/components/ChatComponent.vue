<template>
  <beautiful-chat
    :participants="participants"
    :titleImageUrl="titleImageUrl"
    :onMessageWasSent="onMessageWasSent"
    :messageList="messageList"
    :newMessagesCount="newMessagesCount"
    :isOpen="true"
    :showEmoji="true"
    :showFile="true"
    :showTypingIndicator="showTypingIndicator"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :messageStyling="messageStyling"
  />
</template>

<script>
import messageHistory from "./messageHistory";
import chatParticipants from "./chatProfiles";
import chatService from "../../services/ChatService";
import EventBus from '../../services/event-bus.js';

export default {
  name: "app",
  props: {
    chatPartner: {
      type: String,
      required: true
    },
    conversationTag: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      participants: chatParticipants,
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: messageHistory,
      newMessagesCount: 0,
      showTypingIndicator: "",
      alwaysScrollToBottom: false,
      messageStyling: true,
      firstime: false
    };
  },
  created(){
    chatService.init();
    //chatService.sendMessage('mein.arbeitgeber', 'howdy buddy arbeitgeber von manuel', 'allgemein');
  },

  mounted(){
    console.log('Chat Component mounted');
    chatService.getConversationByName(this.chatPartner, this.conversationTag, 0, 100, this);
    EventBus.$on("loadedMsg", payload => {
    });
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          data: { text }
        });
      }
    },
    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : "";
    },
    onMessageWasSent(message) {
      chatService.sendMessage(this.chatPartner, message.data.text, this.conversationTag, this);
      // this.messageList = [...this.messageList, message];
    },
    showStylingInfo() {
      this.$modal.show("dialog", {
        title: "Info",
        text:
          "You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>"
      });
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked;
    }
  },
  computed: {}
};
</script>

<style>
</style>
