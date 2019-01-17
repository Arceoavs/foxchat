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
        <div v-if="generalChat">
          <chat-list-component
            v-bind:tag="generalChat.conversation_tag"
            v-bind:provider="provider"
            v-bind:message="generalChat.message"
            v-bind:date="generalChat.updated_at"
            v-on:chat-partner-changed="informChatComponent"
          ></chat-list-component>
        </div>

        <div v-else>
          <chat-list-component
            v-bind:tag="'allgemein'"
            v-bind:provider="provider"
            v-on:chat-partner-changed="informChatComponent"
          ></chat-list-component>
        </div>
      </div>

      <!-- Document chats -->
      <div v-if="documentChats">
        <chat-list-component
          v-for="documentChat in documentChats"
          v-bind:key="documentChat.conversation_id"
          v-bind:tag="documentChat.conversation_tag"
          v-bind:provider="provider"
          v-bind:message="documentChat.message"
          v-bind:date="documentChat.updated_at"
          v-on:chat-partner-changed="informChatComponent"
        ></chat-list-component>
      </div>

      <!-- Add chat -->
      <!-- <b-card class="mt-2 textColor">
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
      </b-card> -->
      <router-link :to="'/Documents'" class="undecorated">
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
      </router-link>
    </b-collapse>
  </b-jumbotron>
</template>

<script>
import ChatListComponent from "./ChatListComponent.vue";
import BroadcastingService from "../../../services/BroadcastingService.js";

export default {
  props: ["provider", "documentChats", "generalChat"],
  data() {
    return {
      showCollapse: false
    };
  },
  created() {},
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
    }
  },
  methods: {
    informChatComponent(e) {
      this.$emit("chat-partner-changed", e);
    }
  },
  beforeDestroy() {
    console.log("bd chatclientcomponent");
  },
  destroyed() {
    console.log("d chatclientcomponent");
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
  cursor: pointer;
}
.rotate-down {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
