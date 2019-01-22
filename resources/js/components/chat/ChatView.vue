<template>
  <b-container fluid>
    <!--Headings-->
    <b-row class="mt-3">
      <b-col md="4" class="d-none d-md-block d-lg-block d-xl-block">
        <div class="overViewChatsTitle">
          <h2
            v-if="this.isProvider"
            class="textColor"
            v-text="$ml.get('provider_list_title_chat_overview')"
          ></h2>
          <h2 v-else class="textColor" v-text="$ml.get('client_list_title_chat_overview')"></h2>
        </div>
      </b-col>
      <b-col>
        <div class="chatTitle overViewTitle">
          <h4 class v-text="this.nameForOverview"></h4>
          <h5 class v-if="this.$route.query.tag == 'allgemein'" v-text="$ml.get('general_chat')"></h5>
          <h5 class v-else>Dokument: {{this.$route.query.tag}}</h5>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4" class="d-none d-md-block d-lg-block d-xl-block">
        <div class="leftSideOfChat">
          <!--Wenn Provider-->
          <div v-if="isProvider">
            <chat-provider-component v-on:chat-partner-changed="changeRoute"></chat-provider-component>
          </div>
          <!--Wenn Client-->
          <div v-else>
            <chat-client-component
              class="smaller-heading"
              v-for="provideritem in providers"
              v-bind:key="provideritem.ProviderShortName"
              v-bind:provider="provideritem.ProviderShortName"
              v-bind:documentChats="provideritem.documentChats"
              v-bind:generalChat="provideritem.generalChat"
              v-on:chat-partner-changed="changeRoute"
            ></chat-client-component>
          </div>
        </div>
      </b-col>
      <b-col md="8" cols="12">
        <chat-component
          v-bind:partner="this.$route.query.partner"
          v-bind:tag="this.$route.query.tag"
          v-on:message-was-sent="updateChatServicesTriggeredByPusher"
        ></chat-component>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
import ChatComponent from "./ChatComponent.vue";
import ChatClientComponent from "./client/ChatClientComponent.vue";
import ChatProviderComponent from "./provider/ChatProviderComponent.vue";
import ChatService from "../../services/ChatService";
import BroadcastingService from "../../services/BroadcastingService.js";
import FoxdoxSubscriberService from "../../services/FoxdoxSubscriberService.js";
import { store } from "../../store.js";
import { MLBuilder } from "vue-multilanguage";
import EventBus from "../../services/event-bus";

export default {
  created() {
    EventBus.$on("messageWasReceived", payload => {
      this.updateChatServices();
    });
    EventBus.$on("messageWasRead", payload => {
      this.updateChatServicesTriggeredByPusher();
    });
    if (store.state.user.isProvider) {
      ChatService.getInboxProvider();
    } else {
      ChatService.getInbox();
    }
    if (this.$route.query.partner && this.$route.query.tag) {
      ChatService.getConversationByName(
        this.$route.query.partner,
        this.$route.query.tag,
        0,
        100,
        false
      );
    }
    console.log("chatview created");
  },
  beforeDestroy(){
    EventBus.$off("messageWasReceived");
    EventBus.$off("messageWasRead");
  },
  data() {
    return {
      chatPartner: this.$route.query.partner,
      conversationTag: this.$route.query.tag
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
    },
    nameForOverview: function() {
      return this.$ml.get("your_chat") + " " + this.$route.query.partner;
    }
  },
  methods: {
    changeRoute(e) {
      if (store.state.user.isProvider) {
        console.log("in change route" + e.provider + e.tag);
        this.$router.push({
          name: "ChatViewProvider",
          query: { partner: e.partner, tag: e.tag }
        });
      } else {
        this.$router.push({
          name: "ChatViewUser",
          query: { partner: e.provider, tag: e.tag }
        });
      }
      this.updateChatServices();
    },
    updateChatServices() {
      ChatService.getConversationByName(
        this.$route.query.partner,
        this.$route.query.tag,
        0,
        100,
        false
      );
      if (store.state.user.isProvider) {
        ChatService.getInboxProvider();
        FoxdoxSubscriberService.getSubscriberList();
      } else {
        ChatService.getInbox();
      }
    },
    updateChatServicesTriggeredByPusher() {
      this.wait(200);
      ChatService.getConversationByName(
        this.$route.query.partner,
        this.$route.query.tag,
        0,
        100,
        true
      );
      if (store.state.user.isProvider) {
        ChatService.getInboxProvider();
        FoxdoxSubscriberService.getSubscriberList();
      } else {
        ChatService.getInbox();
      }
    },
    wait(ms) {
      var d = new Date();
      var d2 = null;
      do {
        d2 = new Date();
      } while (d2 - d < ms);
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
.overViewChatsTitle {
  text-align: center;
}
.overViewTitle {
  color: white;
}
.leftSideOfChat {
  height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-style: solid;
  border-color: lightgray;
  border-radius: 5px;
}
</style>
