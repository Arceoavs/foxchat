<template>
  <div>
    <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">
      <!-- Document Name -->
      <b-card>
        <div slot="header" style="text-align:left;">
          {{userName}}
          <span style="float:right;">{{timeStamp}}</span>
        </div>
        <!--Todo: Provider Communication -->
        <router-link to="/communication">
          <h4 class="left textColor">{{documentName}}</h4>
          <font-awesome-icon class="cardIcon textFox" icon="comments" size="2x"/>
        </router-link>
      </b-card>
    </b-jumbotron>
  </div>
</template>


<script>
import ChatListComponent from "./ChatListComponent.vue";

export default {
  props: ["documentName", "timeStamp", "userName"], //documentChats
  data() {
    return {
      generalChat: "Allgemeiner Chat", //remove?
      addChat: "Chat hinzufügen" //remove?
    };
  },
  components: {
    ChatListComponent
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