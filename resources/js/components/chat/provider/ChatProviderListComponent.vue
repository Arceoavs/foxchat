<template>
  <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">
    <b-card @click="informChatComponent()" class="textColor center">
      <div slot="header" style="text-align:left;">{{userName}}</div>
      <b-row>
        <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
          <font-awesome-icon
            v-if="documentName == 'allgemein'"
            class="textFox"
            icon="comments"
            size="2x"
          />
          <font-awesome-icon v-if="documentName != 'allgemein'" icon="file" size="2x"/>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h5 class="text-left" v-if="documentName != 'allgemein'">Dokument: {{documentName}}</h5>
              <h5
                class="text-left"
                v-if="documentName == 'allgemein'"
                v-text="$ml.get('this_is_the_general_chat')"
              ></h5>
            </b-col>
            <b-col>
              <h5 class="text-right" v-text="$ml.get('your_chat')">{{userName}}</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p class="font-weight-light text-left">{{chatMessagePreview}}</p>
            </b-col>
            <b-col>
              <p
                class="font-weight-light chatDateTime text-right d-none d-md-block d-lg-block d-xl-block"
              >{{dateTimeForProviders}}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </b-jumbotron>
</template>

<script>

export default {
  props: ["documentName", "date", "userName", "message"],
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
    },
    chatMessagePreview() {
      var messagePreviewLength = 70;
      if (this.message.length > messagePreviewLength)
        return this.message.substring(0, messagePreviewLength) + "...";
      else return this.message;
    }
  },
  methods: {
    informChatComponent: function() {
      var routeProps = new Object();
      routeProps.userName = this.userName;
      routeProps.tag = this.documentName;
      this.$emit("chat-partner-changed", routeProps);
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
