<template>
    <!-- Folder name -->
    <b-card class="box" @click="openFolder()">
      <font-awesome-icon class="fox" icon="folder-open" size="2x"/>{{name}}
    </b-card>
</template>

<script>
import FolderService from "../../services/FolderService.js";

export default {
  props: ["name", "id"],
  methods: {
    openFolder(){
      console.log('listing content of '+this.id);
      // FolderService.getRootFolder();
      FolderService.listSubFolders(this.id);
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
.folder{
  text-align: right !important;
}
</style>
