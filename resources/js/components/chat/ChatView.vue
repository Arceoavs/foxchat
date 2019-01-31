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
          <h4 class v-text="chatPartner"></h4>
          <h5 class v-if="this.conversationTag == 'allgemein'" v-text="$ml.get('general_chat')"></h5>
          <h5 class v-else>Dokument: {{this.conversationTag}}</h5>
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
            <chat-list-component
              class="smaller-heading"
              v-for="provideritem in providers"
              v-bind:key="provideritem.ProviderShortName"
              v-bind:userName="provideritem.ProviderShortName"
              v-bind:documentChats="provideritem.documentChats"
              v-bind:generalChat="provideritem.generalChat"
              v-on:chat-partner-changed="changeRoute"
            />
          </div>
        </div>
      </b-col>
      <b-col md="8" cols="12">
        <chat-window
          v-bind:userName="chatPartner"
          v-bind:tag="conversationTag"
          v-on:message-was-sent="updateChatServicesTriggeredByPusher"
        />
      </b-col>
    </b-row>
    <router-view/>
  </b-container>
</template>

<script>
import ChatWindow from "./ChatWindow.vue";
import ChatListComponent from "./client/ChatList.vue";
import ChatProviderComponent from "./provider/ChatProviderComponent.vue";
import ChatService from "../../services/ChatService";
import BroadcastingService from "../../services/BroadcastingService.js";
import FoxdoxSubscriberService from "../../services/FoxdoxSubscriberService.js";
import { MLBuilder } from "vue-multilanguage";
import EventBus from "../../services/event-bus";
//This component will refers the "/communication" page.

export default {
  created() {
    //When the component is created it will listen to events from pusher if the chat partner sent a message.
    EventBus.$on("messageWasReceived",
      //Update the chat service because a new message is there.
      this.updateChatServices
    );
    //When the component is created it will listen to events from pusher if the chat partner read a message.
    EventBus.$on("messageWasRead", 
      //Update the chat service because a message sent from you was read.
      //But to prevent a unlimited cycle of pusher events trigger api calls this special triggeredbypusher method will be used.
      this.updateChatServicesTriggeredByPusher
    );
    //Checks if the current user is a provider or user and gets the matching inbox.
    if (this.$store.state.user.isProvider) {
      ChatService.getInboxProvider();
    } else {
      ChatService.getInbox();
    }
    //Checks if both the userName and conversationtag exists and if so the conversation will be requested.
    if (
      this.$store.state.communicationUrl.userName &&
      this.$store.state.communicationUrl.conversationTag
    ) {
      ChatService.getConversationByName(
        this.$store.state.communicationUrl.userName,
        this.$store.state.communicationUrl.conversationTag,
        0,
        100,
        false
      );
    }
  },
  // If the user leaves the page, the EventBus will be deactivated and the current conversations url resetted.
  beforeDestroy() {
    EventBus.$off("messageWasReceived", this.updateChatServices);
    EventBus.$off("messageWasRead", this.updateChatServicesTriggeredByPusher);
    this.$store.dispatch('resetCommunicationUrl');
  },
  //The current chatpartner from the store.
  data() {
    return {
      chatPartner: this.$store.state.communicationUrl.userName
    };
  },
  computed: {
    //If the current user is a foxdox user this is the inbox.
    providers: function() {
      return this.$store.state.inboxForUser;
    },
    //Determines if the current user is provider or not.
    isProvider: function() {
      return JSON.parse(localStorage.getItem("user")).isProvider == 1;
    },
    //If the current user is a foxdox provider this is the inbox.
    chats: function() {
      return this.$store.state.inboxForProvider;
    },
    //The current conversationtag.
    conversationTag() {
      return this.$store.state.communicationUrl.conversationTag;
    }
  },
  methods: {
    //If one of the childrens emitted a route change these will change the current chat and distinguishes between Foxdox users and providers.
    changeRoute(e) {
      if (this.$store.state.user.isProvider) {
        console.log("in change route" + e.userName + e.tag);
        var communicationUrl = { userName: e.userName, conversationTag: e.tag };
        this.$store.commit("setCommunicationUrl", communicationUrl);
        this.$router.push({
          name: "ChatViewProvider"
        });
      } else {
        var communicationUrl = { userName: e.userName, conversationTag: e.tag };
        this.$store.commit("setCommunicationUrl", communicationUrl);
        this.$router.push({
          name: "ChatViewUser"
        });
      }
      this.updateChatServices();
    },
    //This methods updates the inbox und conversation through the chatservice.
    updateChatServices() {
      ChatService.getConversationByName(
        this.$store.state.communicationUrl.userName,
        this.$store.state.communicationUrl.conversationTag,
        0,
        100,
        false
      );
      if (this.$store.state.user.isProvider) {
        ChatService.getInboxProvider();
        FoxdoxSubscriberService.getSubscriberList();
      } else {
        ChatService.getInbox();
      }
    },
    //This methods updates the inbox und conversation through the chatservice. But will tell the chatservice it was triggered by pusher.
    updateChatServicesTriggeredByPusher() {
      ChatService.getConversationByName(
        this.$store.state.communicationUrl.userName,
        this.$store.state.communicationUrl.conversationTag,
        0,
        100,
        true
      );
      if (this.$store.state.user.isProvider) {
        ChatService.getInboxProvider();
        FoxdoxSubscriberService.getSubscriberList();
      } else {
        ChatService.getInbox();
      }
    }
  },
  //The used components.
  components: {
    ChatWindow,
    ChatListComponent,
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
