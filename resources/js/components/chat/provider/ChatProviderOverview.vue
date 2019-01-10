<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <!-- Chats -->
        <chat-provider-component
          v-for="chatItem in chats"
          v-bind:key="chatItem.thread.conversation_id"
          v-bind:documentName="chatItem.thread.conversation_tag"
          v-bind:message="chatItem.thread.message"
          v-bind:date="chatItem.thread.updated_at"
          v-bind:userName="chatItem.withUser.name"
        ></chat-provider-component>
        <!-- Add chat -->
        <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">
          <b-card>
            <b-row>
              <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
                <font-awesome-icon icon="plus-circle" size="2x"/>
              </b-col>
              <b-col><h4 class="textColor" v-text = "$ml.get('add_chat')" /></b-col>
            </b-row>
          </b-card>
        </b-jumbotron>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
import ChatProviderComponent from "./ChatProviderComponent.vue";
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
  },
  mounted() {
    ChatService.getInboxProvider();
  },
  computed: {
    chats: function() {
      return store.state.inboxForProvider;
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
