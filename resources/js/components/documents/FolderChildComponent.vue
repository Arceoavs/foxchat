<template>
  <!-- Diese Component wird als Unterordner eines beliebigen Oberordners angezeigt. 
  Ordner auf oberster Ebene werden durch die Folder Component abgebildet.-->
  <b-container>
    <!-- Alle Dokumente in diesem Ordner anzeigen -->
    <document-component
      v-for="document in documents"
      v-bind:key="document.Id"
      v-bind:id="document.Id"
      v-bind:name="document.Name"
      v-bind:folderPath="document.FolderPath"
    ></document-component>

    <!-- Alle Unterordner in diesem Ornder anzeigen -->
    <folder-component
      v-for="folder in folders"
      v-bind:key="folder.Id"
      v-bind:id="folder.Id"
      v-bind:name="folder.Name"
    ></folder-component>
  </b-container>
</template>

<script>
import DocumentComponent from "./DocumentComponent.vue";
import FolderService from "../../services/FolderService";
import FolderComponent from "./FolderComponent.vue";

export default {
  computed: {
    // Dokumente des aktuellen Ordners werden im store gespeichert
    documents: function() {
      return this.$store.state.currentDocuments;
    },
    // Unterordner des aktuellen Ordners werden um store gespeichert
    folders: function() {
      return this.$store.state.currentFolder;
    }
  },
  components: {
    DocumentComponent,
    FolderComponent
  }
};
</script>

<style>
/* In Unterordnern verwendete Styles*/
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
