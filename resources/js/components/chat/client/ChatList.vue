<template>
  <b-jumbotron bg-variant="secondary" class="chatGroupList">
    <!-- Provider name -->
    <b-card
      @click="showCollapse = !showCollapse"
      :class="showCollapse ? 'collapsed' : null"
      aria-controls="collapse"
      :aria-expanded="showCollapse ? 'true' : 'false'"
      class="cursorPointer"
    >
      <h4 class="left textColor">{{userName}}</h4>
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
        <chat-element-component
          v-if="generalChat"
          v-bind:tag="generalChat.conversation_tag"
          v-bind:userName="userName"
          v-bind:message="generalChat.message"
          v-bind:date="generalChat.updated_at"
          v-on:chat-partner-changed="informChatComponent"
        />
        <chat-element-component
          v-else
          v-bind:tag="'allgemein'"
          v-bind:userName="userName"
          v-on:chat-partner-changed="informChatComponent"
        />
      </div>

      <!-- Document chats -->
      <div v-if="documentChats">
        <chat-element-component
          v-for="documentChat in documentChats"
          v-bind:key="documentChat.conversation_id"
          v-bind:tag="documentChat.conversation_tag"
          v-bind:userName="userName"
          v-bind:message="documentChat.message"
          v-bind:date="documentChat.updated_at"
          v-on:chat-partner-changed="informChatComponent"
        />
      </div>
    </b-collapse>
  </b-jumbotron>
</template>

<script>
import ChatElementComponent from "./ChatElement.vue";
import BroadcastingService from "../../../services/BroadcastingService.js";

export default {
  //The component will be done for every provider the user subscribed to and registered on foxChat.
  props: ["userName", "documentChats", "generalChat"],
  data() {
    return {
      showCollapse: false
    };
  },
  //The components used.
  components: {
    ChatElementComponent
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
    //This will emit the given event to the parent component.
    informChatComponent(e) {
      this.$emit("chat-partner-changed", e);
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
.chatGroupList {
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
.cursorPointer{
  cursor: pointer;
}
</style>
