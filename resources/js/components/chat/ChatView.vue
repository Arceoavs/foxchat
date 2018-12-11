<template>
  <b-container fluid>
    <b-row class="justify-content-center my-3">
      <b-col md="4" class="d-none d-md-block d-lg-block d-xl-block">
        <chat-overview-component></chat-overview-component>
      </b-col>
      <b-col md="8" cols="12">
        <chat-component
          v-bind:chatPartner="this.partner"
          v-bind:conversationTag="this.tag"
        ></chat-component>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatComponent from "./ChatComponent.vue";
import ChatOverviewComponent from "./ChatOverviewComponent.vue";
export default {
   props: {
    partner: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    }
  },
  mounted(){
    console.log(this.partner);
    console.log(this.tag);
  },
  data(){
    console.log(this.$route.params);
    return{
      chatPartner: this.partner,
      conversationTag: this.tag
    }
  },
  components: {
    ChatComponent,
    ChatOverviewComponent
  }
};
</script>

<style>
</style>
