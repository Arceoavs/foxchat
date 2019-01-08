<template>
  <!-- Folder name -->
  <router-link v-bind:to="{ path: name}" append>
    <b-card class="box" @click="openFolder()">
      <font-awesome-icon class="fox" icon="folder-open" size="2x"/>
      {{name}}
    </b-card>
  </router-link>
</template>

<script>
import FolderService from "../../services/FolderService.js";
import Folder from "../../model/folder.js";
import ListComponent from "./ListComponent.vue";

export default {
  props: ["name", "id"],
  methods: {
    openFolder() {
      // FolderService.getProviderFolder();
      // FolderService.listSubFolders(this.id);
      // FolderService.listDocuments(this.id);
    }
  }
};
</script>

<style>
.folderGroup {
  padding: 0.1em;
  margin: 0.1em;
  background-color: rgba(241, 241, 241, 0.1) !important;
  cursor: pointer;
}
.box {
  color: rgba(108, 117, 125, 1) !important;
  text-decoration: none !important;
}
.box:hover {
  color: #f86a2d !important;
  cursor: pointer;
}

.fox {
  color: #f86a2d !important;
}
.folder {
  text-align: right !important;
}
</style>
