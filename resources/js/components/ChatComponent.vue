<template>
  <b-container fluid>
    <b-row class="justify-content-md-center my-3">
      <b-col md="8" sm="12">
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import messageHistory from "./messageHistory";
import chatParticipants from "./chatProfiles";
export default {
  name: "app",
  data() {
    return {
      participants: chatParticipants,
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: messageHistory,
      newMessagesCount: 0,
      showTypingIndicator: "",
      alwaysScrollToBottom: false,
      messageStyling: true
    };
  },
  created() {},
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
      this.messageList = [...this.messageList, message];
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
