<template>
  <b-jumbotron bg-variant="secondary" class="chatGroup">
    <!-- Provider name -->
    <b-card>
      <h4 class="left textColor">{{provider}}</h4>
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
.rotate-down {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
