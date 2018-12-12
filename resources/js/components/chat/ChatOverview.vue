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
import {store} from "../../store.js";
import ChatOverviewService from '../../services/ChatOverviewService';

export default {
  data() {
    return {
      //providers
    };
  },
  components: {
    ChatOverviewComponent
  },
  mounted(){
    
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
