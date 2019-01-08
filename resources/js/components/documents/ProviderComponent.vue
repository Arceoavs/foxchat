<template>
  <b-row>
    <b-col>
      <router-link :to="{name:'children'}" append>
        <provider-list-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.ProviderShortName"
          v-bind:provider="provideritem.ProviderShortName"
          v-bind:documentChats="provideritem.documentChats"
          v-bind:generalChat="provideritem.generalChat"
        ></provider-list-component>
      </router-link>
      <button v-on:click="test">Teste!</button>
      <router-view></router-view>
    </b-col>
  </b-row>
</template>

<script>
import FolderComponent from "./FolderComponent.vue";
import ProviderListComponent from "./ProviderListComponent.vue";
import FolderService from "../../services/FolderService.js";
import { store } from "../../store.js";

export default {
  data() {
    //console.log(this.$route);
    //console.log(this.$route.currentRoute);
    return {};
  },
  mounted() {},
  components: {
    FolderComponent,
    ProviderListComponent
  },
  computed: {
    providers: function() {
      //return store.state.providerList;
      return store.state.inboxForUser;
    }
  },
  methods: {
    test() {
      //console.log("Hole mir den Root: " + store.state.userRootFolder.Id);
      // console.log("Hole mir den Privider Folder " +FolderService.getSubFolders(store.state.userRootFolder));
      console.log(
        "Hole Dokumente " +
          FolderService.getDocuments(store.state.userRootFolder.Id)
      );
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
