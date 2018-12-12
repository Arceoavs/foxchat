<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <chat-overview-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.id"
          v-bind:provider="provideritem.name"
          v-bind:documentChats="provideritem.documentChats"
        ></chat-overview-component>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatOverviewComponent from "./ChatOverviewComponent.vue";
import providerListStore from "../../store.js";
//import providerList from "./providerList.js";

import { returnProviderList } from "../../services/ChatOverviewService.js";

export default {
  data() {
    return {
      providers
    };
  },
  components: {
    ChatOverviewComponent
  },
  computed: {
    providers() {
      return providerListStore.state.providerList;
    }
  },
  watch: {
    providers() {
      // Our fancy notification (2).
      console.log("Wert aktualisiert");
    }
  }
};
</script>

<style>
</style>
