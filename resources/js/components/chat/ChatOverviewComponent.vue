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
      <router-link :to="'/communication/'+provider+'/allgemein'">
        <b-card class="textColor">
          {{generalChat}}
          <div class="cardIcon textFox">
            <font-awesome-icon icon="comments" size="2x"/>
          </div>
        </b-card>
      </router-link>

      <!-- Document chats -->
      <div>
        <chat-list-component
          v-for="documentChat in documentChats"
          v-bind:key="documentChat.id"
          v-bind:title="documentChat.title"
        ></chat-list-component>
      </div>

      <!-- Add chat -->
      <b-card class="mt-2 textColor">
        {{addChat}}
        <div class="cardIcon textFox">
          <font-awesome-icon icon="plus-circle" size="2x"/>
        </div>
      </b-card>
    </b-collapse>
  </b-jumbotron>
</template>

<script>
import ChatListComponent from "./ChatListComponent.vue";

export default {
  props: ["provider", "documentChats"],
  data() {
    return {
      generalChat: "Allgemeiner Chat",
      addChat: "Chat hinzufügen",
      showCollapse: false
    };
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
    }
  }

};
</script>

<style>
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
