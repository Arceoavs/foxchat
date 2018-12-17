<template>
  <b-jumbotron bg-variant="secondary" class="chatGroup">
    <!-- Provider name -->
    <b-card
      @click="showCollapse = !showCollapse"
      :class="showCollapse ? 'collapsed' : null"
      aria-controls="collapse"
      :aria-expanded="showCollapse ? 'true' : 'false'"
    >
      <h4 class="left textColor">{{provider}}</h4>
      <font-awesome-icon
        class="cardIcon textFox"
        icon="angle-right"
        size="2x"
        :class="dropdownArrow"
      />
    </b-card>

    <!-- General Chat -->
    <b-collapse class="mt-2 ml-3" v-model="showCollapse" id="collapse">
      <div>
        <router-link :to="'/communication?partner='+provider+'&tag=allgemein'">
          <b-card class="textColor" @click="informChatComponent()">
            <b-row>
              <b-col cols="1">
                <div class="chatIcons textFox">
                  <font-awesome-icon icon="comments" size="2x"/>
                </div>
              </b-col>
              <b-col cols="2">
                <p class="font-weight-bold">{{generalChatTitel}}</p>
              </b-col>
              <b-col v-if="generalChat" cols="7">
                <p class="font-weight-light text-left">{{generalChat.message}}</p>
              </b-col>
              <b-col v-if="generalChat" cols="2">
                <p
                  class="font-weight-light text-right"
                >{{cuttedDateForGeneralChat}} {{cuttedTimeForGeneralChat}}</p>
              </b-col>
            </b-row>
          </b-card>
        </router-link>
      </div>

      <!-- Document chats -->
      <div>
        <chat-list-component
          v-for="documentChat in documentChats"
          v-bind:key="documentChat.conversation_id"
          v-bind:title="documentChat.conversation_tag"
          v-bind:provider="provider"
          v-bind:message="documentChat.message"
          v-bind:date="documentChat.updated_at"
        ></chat-list-component>
      </div>

      <!-- Add chat -->
      <b-card class="mt-2 textColor">
        <b-row>
          <b-col cols="1">
            <div class="chatIcons textFox">
              <font-awesome-icon icon="plus-circle" size="2x"/>
            </div>
          </b-col>
          <b-col cols="11">
            <p class="font-weight-bold">{{addChat}}</p>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
  </b-jumbotron>
</template>

<script>
import ChatListComponent from "./ChatListComponent.vue";
import BroadcastingService from "../../../services/BroadcastingService.js";
import EventBus from "../../../services/event-bus";

export default {
  props: ["provider", "documentChats", "generalChat"],
  data() {
    return {
      generalChatTitel: "Allgemeiner Chat",
      addChat: "Chat hinzufügen",
      showCollapse: false
    };
  },
  created() {
    //Load Broadcast after side refresh
    BroadcastingService.initialize();
    BroadcastingService.subscribeToChannel();
  },
  components: {
    ChatListComponent
  },
  computed: {
    dropdownArrow() {
      let arrow = "rotate-down";
      if (this.showCollapse === true) {
        return arrow;
      }
      return true;
    },
    cuttedTimeForGeneralChat() {
      return this.generalChat.updated_at.slice(11, 16);
    },
    cuttedDateForGeneralChat() {
      return (
        this.generalChat.updated_at.slice(8, 10) +
        "." +
        this.generalChat.updated_at.slice(5, 7) +
        "."
      );
    }
  },
  methods: {
    informChatComponent: function() {
      EventBus.$emit("chatPartnerChanged");
    }
  }
};
</script>

<style>
.chatIcons {
  float: left;
}
.chatGroup {
  padding: 0.3em;
  margin: 0.3em;
  background-color: rgba(90, 83, 83, 0.1) !important;
}
.rotate-down {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
