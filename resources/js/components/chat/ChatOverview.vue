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
//import providerList from "./providerList.js";

import { returnProviderList } from "../../services/ChatOverviewService.js";

export default {
  data() {
    return {
      providers: null
    };
  },
  components: {
    ChatOverviewComponent
  },
  mounted() {
    var providerListIsComing = new Promise(function(resolve, reject) {
      if (localStorage.getItem("chatOverviewProviderList") != null) {
        resolve();
      } else {
        reject();
      }
    });

    providerListIsComing.then(
      (this.providers = JSON.parse(
        localStorage.getItem("chatOverviewProviderList")
      ))
    );

    console.log("In local Storage: ");
  }
};
</script>

<style>
</style>
