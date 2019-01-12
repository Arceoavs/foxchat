<template >
  <div class="mt-2">
    <b-card class="textColor" @click="informChatComponent()">
      <router-link
        :to="'/chat/communication?partner='+provider+'&tag='+title"
        class="textColor chat-overview-link"
      >
        <b-row>
          <b-col class="chatIcons textFox" cols="1" sm="2" md="1">
            <font-awesome-icon icon="file" size="2x"/>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                <p class="font-weight-bold">{{title}}</p>
              </b-col>
              <b-col>
                <p
                  class="font-weight-light chatDateTime text-right d-none d-md-block d-lg-block d-xl-block"
                >{{cuttedDate}} {{cuttedTime}}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <p class="font-weight-light text-left">{{message}}</p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </router-link>
    </b-card>
  </div>
</template>

 <script>
import EventBus from "../../../services/event-bus";

export default {
  props: ["title", "provider", "message", "date"],
  computed: {
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
.chatIcons {
  float: left;
}
</style>
