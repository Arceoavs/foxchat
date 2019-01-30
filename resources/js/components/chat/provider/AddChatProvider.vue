<template>
  <b-jumbotron bg-variant="secondary" class="chatGroup mt-3" @click="informChatComponent()">
    <b-card>
        <b-row>
          <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
            <font-awesome-icon icon="plus-circle" size="2x"/>
          </b-col>
          <b-col>
            <h4 class="textColor" v-text="$ml.get('add_chat') + ' ' +this.userName"/>
          </b-col>
        </b-row>
    </b-card>
  </b-jumbotron>
</template>

<script>
export default {
  // This component will be used to show the "add chat button" on the chat overview
  props: ["userName"],
  methods: {
    //If the button will be klicked on the parents will be informed. With the needed parameters(userName and tag)
    informChatComponent: function() {
      var routeProps = new Object();
      routeProps.userName = this.userName;
      routeProps.tag = "allgemein";
      this.$emit("chat-partner-changed", routeProps);
    }
  }
};
</script>

<style>
.chatIcon {
  min-width: 3em;
}
.right {
  float: right;
}
.left {
  float: left;
}
</style>