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
    :alwaysScrollToBottom="true"
    :messageStyling="messageStyling"
    :placeholder="$ml.get('chat_input')"
  />
</template>

<script>
import ChatService from "../../services/ChatService";

export default {
  data() {
    return {
      participants: [
        {
          id: "",
          name: ""
        }
      ],
      titleImageUrl: "",
      newMessagesCount: 0,
      showTypingIndicator: "",
      messageStyling: false
    };
  },
  created() {
    this.initChat();
  },
  computed: {
    messageList: function() {
      return this.$store.state.messageList;
    }
  },
  methods: {
    initChat() {
      this.participants = [
        {
          id: "0",
          name: this.$store.state.communicationUrl.userName,
          imageUrl: ""
        },
        {
          id: "0",
          name: JSON.parse(localStorage.getItem("user")),
          imageUrl: ""
        }
      ];
    },
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
      ChatService.sendMessage(
        this.$store.state.communicationUrl.userName,
        message.data.text,
        this.$store.state.communicationUrl.conversationTag,
        this
      );
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
    },
    resetChat() {
      this.initChat();
    }
  }
};
</script>

<style>
</style>
