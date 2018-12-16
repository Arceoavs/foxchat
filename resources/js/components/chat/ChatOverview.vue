<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <div
          v-if="providers.length==0"
          class="text-center"
        >Sie haben keine Provider, die sich für den foxChat registriert haben.</div>
        <chat-overview-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.ProviderShortName"
          v-bind:provider="provideritem.ProviderShortName"
          v-bind:documentChats="provideritem.documentChats"
          v-bind:generalChat="provideritem.generalChat"
        ></chat-overview-component>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatOverviewComponent from "./ChatOverviewComponent.vue";
import ChatService from "../../services/ChatService";
import EventBus from "../../services/event-bus.js";
import { store } from "../../store.js";

export default {
  data() {
    return {};
  },
  created() {
    //Load Broadcast after side refresh
    EventBus.$on("messageWasReceived", payload => {
      ChatService.getInbox();
    });
  },
  components: {
    ChatOverviewComponent
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
