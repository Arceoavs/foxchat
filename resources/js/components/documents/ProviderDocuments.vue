<template>
  <b-card>
    <router-link :to="{name:'children'}" append>
      <p>lol</p>
      <router-view></router-view>
      <provider-list-component
        v-for="provideritem in providers"
        v-bind:key="provideritem.ProviderShortName"
        v-bind:provider="provideritem.ProviderShortName"
        v-bind:documentChats="provideritem.documentChats"
        v-bind:generalChat="provideritem.generalChat"
      ></provider-list-component>
    </router-link>
  </b-card>
</template>

<script>
import FolderComponent from "./FolderComponent.vue";
import ProviderListComponent from "./ProviderListComponent.vue";
import { store } from "../../store.js";

export default {
  data() {
    console.log(this.$route);
    console.log(this.$route.currentRoute);
    return {};
  },
  components: {
    FolderComponent,
    ProviderListComponent
  },
  computed: {
    providers: function() {
      console.log(store.state.inboxForUser);
      //return store.state.providerList;
      return store.state.inboxForUser;
    }
  }
};
</script>

<style>
.box {
  color: #f86a2d !important;
  padding: 0.1em;
  margin: 0.1em;
}
</style>
