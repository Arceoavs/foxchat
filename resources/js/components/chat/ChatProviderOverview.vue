<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <!-- Chats -->
        <chat-provider-component
          v-for="chatItem in chats"
          v-bind:key="chatItem.thread.conversation_id"
          v-bind:documentName="chatItem.thread.conversation_tag"
          v-bind:date="chatItem.thread.updated_at"
          v-bind:userName="chatItem.withUser.name"
        ></chat-provider-component>
        <!-- Add chat -->
        <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">
          <b-card>
            <h4 class="left textColor">{{addChat}}</h4>
            <div class="cardIcon textFox">
              <font-awesome-icon icon="plus-circle" size="2x"/>
            </div>
          </b-card>
        </b-jumbotron>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatProviderComponent from "./ChatProviderComponent.vue";
import { store } from "../../store.js";
import ChatService from "../../services/ChatService";

export default {
  data() {
    return {
      addChat: "Neuen Chat starten"
    };
  },
    mounted() {
    ChatService.getInboxProvider();
    console.log(store.state.inboxForProvider);
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
.cardIcon {
  float: right;
}
.left {
  float: left;
}
</style>