<template>
  <b-container fluid>
    <b-row class="justify-content-center mt-3">
      <b-col md="4" class="d-none d-md-block d-lg-block d-xl-block">
        <div v-if="isProvider">
          <b-row class="mt-4 pl-2">
            <b-col>
              <h2 class="textColor">{{providerListTitle}}</h2>
            </b-col>
          </b-row>
          <chat-provider-component
            v-for="chatItem in chats"
            v-bind:key="chatItem.thread.conversation_id"
            v-bind:documentName="chatItem.thread.conversation_tag"
            v-bind:date="chatItem.thread.updated_at"
            v-bind:userName="chatItem.withUser.name"
            v-bind:message="chatItem.thread.message"
          ></chat-provider-component>
        </div>
        <div v-else>
          <b-row class="mt-4 mb-2 pl-4">
            <b-col>
                <h2 class="textColor">{{clientListTitle}}</h2>
            </b-col>
          </b-row>
          <chat-client-component
            class="smaller-heading"
            v-for="provideritem in providers"
            v-bind:key="provideritem.ProviderShortName"
            v-bind:provider="provideritem.ProviderShortName"
            v-bind:documentChats="provideritem.documentChats"
            v-bind:generalChat="provideritem.generalChat"
          ></chat-client-component>
        </div>
      </b-col>
      <b-col md="8" cols="12">
        <chat-component
          v-bind:partner="this.$route.query.partner"
          v-bind:tag="this.$route.query.tag"
          v-on:messageWasSent="refreshInbox"
        ></chat-component>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatComponent from "./ChatComponent.vue";
import ChatClientComponent from "./client/ChatClientComponent.vue";
import ChatProviderComponent from "./provider/ChatProviderComponent.vue";
import ChatService from "../../services/ChatService";
import { store } from "../../store.js";

export default {
  mounted() {
    if (store.state.user.isProvider) {
      ChatService.getInboxProvider();
    } else {
      ChatService.getInbox();
    }
    console.log(this.$route.query.partner);
    console.log(this.$route.query.tag);
    console.log("in chatview");
    console.log(this.providers);
    console.log(this.isProvider);
  },
  data() {
    return {
      chatPartner: this.$route.query.partner,
      conversationTag: this.$route.query.tag,
      providerListTitle: "Weitere Chats",
      clientListTitle: "Andere Provider"
    };
  },
  computed: {
    providers: function() {
      return store.state.inboxForUser;
    },
    isProvider: function() {
      return JSON.parse(localStorage.getItem("user")).isProvider == 1;
    },
    chats: function() {
      return store.state.inboxForProvider;
    }
  },
  methods: {
    refreshInbox() {
      console.log("refresh wurde aufgerufen");
      if (store.state.user.isProvider) {
        ChatService.getInboxProvider();
      } else {
        ChatService.getInbox();
      }
    }
  },
  components: {
    ChatComponent,
    ChatClientComponent,
    ChatProviderComponent
  }
};
</script>

<style>
</style>
