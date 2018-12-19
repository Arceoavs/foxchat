<template>
  <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">
    <router-link :to="'/communication?partner='+userName+'&tag='+documentName" class="undecorated">
      <b-card @click="informChatComponent()" class="textColor">
        <div slot="header" style="text-align:left;">{{userName}}</div>

        <b-row>
          <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
            <font-awesome-icon class="textFox" icon="comments" size="2x"/>
          </b-col>
          <b-col>
            <b-row>
              <b-col cols="5">
                <h5>{{documentName}}</h5>
              </b-col>
              <b-col>
                <p
                  class="font-weight-light chatDateTime text-right d-none d-md-block d-lg-block d-xl-block"
                >{{dateTimeForProviders}}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p class="font-weight-light text-left">{{message}}</p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </router-link>
  </b-jumbotron>
</template>

<script>
import ChatListComponent from "../client/ChatListComponent.vue";
import BroadcastingService from "../../../services/BroadcastingService.js";
import EventBus from "../../../services/event-bus";

export default {
  props: ["documentName", "date", "userName", "message"],
  components: {
    ChatListComponent
  },
  created() {
    //Load Broadcast after side refresh
    BroadcastingService.initialize();
    BroadcastingService.subscribeToChannel();
  },
  computed: {
    dateTimeForProviders() {
      // Create date from input value
      var inputDate = new Date(this.date);
      // Get today's date
      var todaysDate = new Date();

      // call setHours to take the time out of the comparison
      if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0))
        // Date equals today's date
        return this.cuttedTime;
      else return this.cuttedDate;
    },
    cuttedTime() {
      return this.date.slice(11, 16);
    },
    cuttedDate() {
      return this.date.slice(8, 10) + "." + this.date.slice(5, 7) + ".";
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
</style>
