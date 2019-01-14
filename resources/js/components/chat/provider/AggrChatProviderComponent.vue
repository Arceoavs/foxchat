<template>
    <b-row class="mt-3">
      <b-col>
        <!-- Chats -->
        <existent-chat-provider-component
          v-for="chatItem in chats"
          v-bind:key="chatItem.thread.conversation_id"
          v-bind:documentName="chatItem.thread.conversation_tag"
          v-bind:message="chatItem.thread.message"
          v-bind:date="chatItem.thread.updated_at"
          v-bind:userName="chatItem.withUser.name"
        ></existent-chat-provider-component>
        <add-chat-provider
          v-for="subscriber in subscribers"
          v-bind:key="subscriber.SubscriptionId"
          v-bind:username="subscriber.UserName">
        </add-chat-provider>
      </b-col>
    </b-row>
</template>

<script>
import ExistentChatProviderComponent from "./ExistentChatProviderComponent.vue";
import FoxdoxSubscriberService from "../../../services/FoxdoxSubscriberService.js";
import AddChatProvider from "./AddChatProvider.vue";
import ChatService from "../../../services/ChatService";
import EventBus from "../../../services/event-bus.js";
import { store } from "../../../store.js";


export default {
  data() {
    return {
      addChat: "Neuen Chat starten"
    };
  },
  created() {
    //Load Broadcast after side refresh
    EventBus.$on("messageWasReceived", payload => {
      ChatService.getInboxProvider();
    });
    FoxdoxSubscriberService.getSubscriberList();
  },
  mounted() {
    ChatService.getInboxProvider();
    FoxdoxSubscriberService.getSubscriberList();
  },
  computed: {
    chats: function() {
      return store.state.inboxForProvider;
    },
    subscribers: function() {
      return store.state.subscriberList;
    }
  },
  components: {
    ExistentChatProviderComponent,
    AddChatProvider
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
