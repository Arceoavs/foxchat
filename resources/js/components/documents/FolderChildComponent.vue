<template>
  <b-container>
    <folder-component
      v-for="folder in folders"
      v-bind:key="folder.Id"
      v-bind:id="folder.Id"
      v-bind:name="folder.Name"
      v-bind:currentfolder="folder"
    ></folder-component>
  </b-container>
</template>

<script>
import DocumentComponent from "./DocumentComponent.vue";
import FolderService from "../../services/FolderService";
import { store } from "../../store.js";
import FolderComponent from "./FolderComponent.vue";

export default {
  props: ["id", "name", "folder"],
  computed: {
    documents: function() {
      return store.state.recentDocuments;
    },
    folders: function() {
      return store.state.recentFolders.Items;
    }
  },
  components: {
    DocumentComponent,
    FolderComponent
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
