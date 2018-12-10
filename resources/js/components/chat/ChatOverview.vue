<template>
  <b-container>
    <b-row class="mt-3" v-model="providers">
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
      providers: { test: "hallo" }
    };
  },
  mounted() {
    this.getProviderList();
    console.log(this.providers);
  },
  watch: {
    providers:function(){
      this.providers = returnProviderList();
    }
  },
  components: {
    ChatOverviewComponent
  },
  methods: {
<<<<<<< HEAD
    getProviderList() {
      returnProviderList().then(provider => this.providers = providers)
    }
=======
    getProviderList() {}
>>>>>>> c0f379df02f1085d650c74f327069b854148f050
  }
};
</script>

<style>
</style>
