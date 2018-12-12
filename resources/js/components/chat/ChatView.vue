<template>
  <b-container fluid>
    <b-row class="justify-content-center mt-3">
      <b-col md="4" class="d-none d-md-block d-lg-block d-xl-block">
        <chat-overview-component
          class="smaller-heading"
          v-for="provideritem in providers"
          v-bind:key="provideritem.id"
          v-bind:provider="provideritem.name"
          v-bind:documentChats="provideritem.documentChats"
        ></chat-overview-component>
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
import providerListStore from "../../store.js";

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
    return{
      chatPartner: this.partner,
      conversationTag: this.tag,
    }
  },
  computed: {
    providers: function() {
      return providerListStore.state.providerList;
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
