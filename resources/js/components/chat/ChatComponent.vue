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
  />
</template>

<script>
import ChatService from "../../services/ChatService";
import { store } from "../../store.js";

export default {
  data() {
    return {
      participants: [
        {
          id: "",
          name: ""
        }
      ],
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      newMessagesCount: 0,
      showTypingIndicator: "",
      alwaysScrollToBottom: false,
      messageStyling: true
    };
  },
  created() {
    this.initChat();
  },
  updated() {
    console.log("in chat component updated");
  },
  computed:{
    messageList: function(){
      return store.state.messageList;
    }
  },
  methods: {
    initChat() {
      this.participants = [
        {
          id: "0",
          name: this.$route.query.partner,
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
        this.$route.query.partner,
        message.data.text,
        this.$route.query.tag,
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
