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
      <b-card class="textColor" @click="changeChatPartner()">
        <router-link
          :to="'/chat/communication?partner='+provider+'&tag=allgemein'"
          class="textColor"
          tag="linkInOverviewComponents"
        >
          <b-row>
            <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
              <font-awesome-icon icon="comments" size="2x"/>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                  <p class="font-weight-bold" v-text="$ml.get('general_chat')"/>
                </b-col>
                <b-col v-if="generalChat">
                  <p
                    class="font-weight-light chatDateTime text-right d-none d-md-block d-lg-block d-xl-block"
                  >{{dateTimerForGeneralChat}}</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col v-if="generalChat">
                  <p class="font-weight-light text-left">{{generalChatMessagePreview}}</p>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </router-link>
      </b-card>

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
          <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
            <div class="chatIcons textFox">
              <font-awesome-icon icon="plus-circle" size="2x"/>
            </div>
          </b-col>
          <b-col>
            <p class="font-weight-bold" v-text="$ml.get('add_chat')"/>
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
      //generalChatTitel: "Allgemeiner Chat",
      //addChat: "Chat hinzufügen",
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
    generalChatMessagePreview() {
      var messagePreviewLength = 70;
      if (this.generalChat.message.length > messagePreviewLength)
        return (
          this.generalChat.message.substring(0, messagePreviewLength) + "..."
        );
      else return this.generalChat.message;
    },
    dateTimerForGeneralChat() {
      // Create date from input value
      var inputDate = new Date(this.generalChat.updated_at);
      // Get today's date
      var todaysDate = new Date();

      // call setHours to take the time out of the comparison
      if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0))
        // Date equals today's date
        return this.cuttedTimeForGeneralChat;
      else return this.cuttedDateForGeneralChat;
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
    changeChatPartner: function() {
      EventBus.$emit("chatPartnerChanged");
    }
  }
};
</script>

<style>
.chatDateTime {
  font-size: 0.8em;
}
.chatIcon {
  min-width: 3em;
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
