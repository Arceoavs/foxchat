<template>
  <b-container>
    <b-row class="mt-4 pl-2">
      <b-col>
        <h2 v-if="providers.length==1" class="textColor" v-text="$ml.get('chat_client_overview_title')"/>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <div
          v-if="providers.length==0"
          class="text-center">
          <p v-text="$ml.get('keine_Provider_msg')" />
        </div>
        <chat-client-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.ProviderShortName"
          v-bind:provider="provideritem.ProviderShortName"
          v-bind:documentChats="provideritem.documentChats"
          v-bind:generalChat="provideritem.generalChat"
        ></chat-client-component>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatClientComponent from "./ChatClientComponent.vue";
import ChatService from "../../../services/ChatService";
import EventBus from "../../../services/event-bus.js";
import { store } from "../../../store.js";

export default {
  data() {
    return {
      //pageTitle: "Ihre Chats mit Providern"
    };
  },
  created() {
    //Load Broadcast after side refresh
    EventBus.$on("messageWasReceived", payload => {
      ChatService.getInbox();
    });
  },
  components: {
    ChatClientComponent
  },
  mounted() {
    ChatService.getInbox();
  },
  computed: {
    providers: function() {
      return store.state.inboxForUser;
    }
  }
};
</script>

<style>
</style>
