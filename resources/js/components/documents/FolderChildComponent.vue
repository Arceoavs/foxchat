<template>
  <b-container>
    <document-component
      v-for="document in documents"
      v-bind:key="document.Id"
      v-bind:id="document.Id"
      v-bind:name="document.Name"
    ></document-component>

    <folder-component
      v-for="folder in folders"
      v-bind:key="folder.Id"
      v-bind:id="folder.Id"
      v-bind:name="folder.Name"
      v-bind:currentfolder="folder"
    ></folder-component>
    <p>{{parent}}</p>
    <button v-on:click="test">Teste!</button>
  </b-container>
</template>

<script>
import DocumentComponent from "./DocumentComponent.vue";
import FolderService from "../../services/FolderService";
import { store } from "../../store.js";
import FolderComponent from "./FolderComponent.vue";

export default {
  data() {
    return {
      parent: this.$route.query.parent
    };
  },
  computed: {
    documents: function() {
      return store.state.currentDocuments;
    },
    folders: function() {
      return store.state.currentFolder;
    }
  },
  components: {
    DocumentComponent,
    FolderComponent
  },
  methods: {
    test() {
      console.log("Teste!");
      //FolderService.getSubFolders(this.parent);
      //console.log(this.folders);
      FolderService.getDocuments(this.parent);
      console.log(this.documents);
    }
  }
};
</script>

<style>
.box {
  color: rgba(108, 117, 125, 1) !important;
  text-decoration: none !important;
}
.box :hover {
  cursor: pointer;
  color: #f86a2d !important;
}
.chatIcon {
  min-width: 3em;
}
.chatGroup {
  padding: 0.3em;
  margin: 0.3em;
  background-color: rgba(90, 83, 83, 0.1) !important;
}
.rotate-down {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
