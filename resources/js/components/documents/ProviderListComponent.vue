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
  </b-jumbotron>
</template>

<script>
export default {
  props: ["provider", "documentChats", "generalChat"],
  data() {
    return {
      //generalChatTitel: "Allgemeiner Chat",
      //addChat: "Chat hinzufügen",
      showCollapse: false
    };
  },
  created() {},
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
.rotate-down {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
