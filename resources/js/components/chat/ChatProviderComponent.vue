<template>
  <div>
    <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">
      <!-- Document Name -->
      <b-card>
        <div slot="header" style="text-align:left;">
          {{userName}}
          <span style="float:right;">{{cuttedTime}} {{cuttedDate}}</span>
        </div>
        <router-link :to="'/communication?partner='+userName+'&tag='+documentName">
          <h4 class="left textColor">{{documentName}}</h4>
          <font-awesome-icon class="cardIcon textFox" icon="comments" size="2x"/>
        </router-link>
      </b-card>
    </b-jumbotron>
  </div>
</template>


<script>
import ChatListComponent from "./ChatListComponent.vue";
import BroadcastingService from "../../services/BroadcastingService.js";

export default {
  props: ["documentName", "date", "userName"],
  components: {
    ChatListComponent
  },
  created() {
    //Load Broadcast after side refresh
    BroadcastingService.initialize();
    BroadcastingService.subscribeToChannel();
  },
  computed: {
    cuttedTime() {
      return this.date.slice(11, 16);
    },
    cuttedDate() {
      return this.date.slice(8, 10) + "." + this.date.slice(5, 7) + ".";
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