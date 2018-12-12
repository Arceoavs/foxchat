<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <chat-overview-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.ProviderShortName"
          v-bind:provider="provideritem.ProviderShortName"
          v-bind:documentChats="provideritem.documentChats"
        ></chat-overview-component>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatOverviewComponent from "./ChatOverviewComponent.vue";
import { store } from "../../store.js";
import ChatService from "../../services/ChatService";

export default {
  data() {
    return {}
  },
  components: {
    ChatOverviewComponent
  },
  mounted() {
    ChatService.getInbox();
  },
  computed: {
    providers: function() {
      return store.state.providerList;
    }
  }
};
</script>

<style>
</style>
