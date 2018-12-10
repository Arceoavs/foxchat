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
    axios
      .get("/api/foxdoxapi/user/listprovidersforoverview", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("bearer")
        }
      })
      .then(response => {
        console.log("Listing Providers...");
        var providerlist = response.data["Items"];
        var responseList = [];
        for (var i = 0; i < providerlist.length; i++) {
          var providerListElem = new Object();
          providerListElem.id = "" + i;
          providerListElem.name = providerlist[i];
          providerListElem.documentChats = [];
          responseList.push(providerListElem);
        }
        console.log(responseList);
        this.providers= responseList;
      });
  }
};
</script>

<style>
</style>
