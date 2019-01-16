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
            <aggr-chat-provider-component></aggr-chat-provider-component>
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
            ></chat-client-component>
          </div>
        </div>
      </b-col>
      <b-col md="8" cols="12">
        <chat-component
          v-bind:partner="this.$route.query.partner"
          v-bind:tag="this.$route.query.tag"
        ></chat-component>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
import ChatComponent from "./ChatComponent.vue";
import ChatClientComponent from "./client/ChatClientComponent.vue";
import AggrChatProviderComponent from "./provider/AggrChatProviderComponent.vue";
import ChatService from "../../services/ChatService";
import BroadcastingService from "../../services/BroadcastingService.js";
import { store } from "../../store.js";
import { MLBuilder } from "vue-multilanguage";
import EventBus from "../../services/event-bus.js";

export default {
  created() {
    BroadcastingService.initialize();
    BroadcastingService.subscribeToChannel();
    EventBus.$on("messageWasSent", payload => {
      console.log("refresh wurde aufgerufen");
      if (store.state.user.isProvider) {
        ChatService.getInboxProvider();
      } else {
        ChatService.getInbox();
      }
    });
    if (store.state.user.isProvider) {
      ChatService.getInboxProvider();
    } else {
      ChatService.getInbox();
    }
    console.log("chatview created");
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
  beforeDestroy() {
    console.log("bd chatview");
    EventBus.$off("messageWasSent", () => {});
  },
  destroyed() {
    console.log("d chatview");
  },
  components: {
    ChatComponent,
    ChatClientComponent,
    AggrChatProviderComponent
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
