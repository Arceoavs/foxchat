<template>
  <b-container fluid>
    <b-row class="justify-content-center my-3">
      <b-col md="4" class="d-none d-md-block d-lg-block d-xl-block">
        <chat-overview-component></chat-overview-component>
      </b-col>
      <b-col md="8" cols="12">
        <chat-component></chat-component>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatComponent from "./ChatComponent.vue";
import ChatOverviewComponent from "./ChatOverviewComponent.vue";
export default {
  components: {
    ChatComponent,
    ChatOverviewComponent
  }
};
</script>

<style>
</style>
