<template>
  <b-jumbotron bg-variant="secondary" class="folderGroup">
    <!-- Folder name -->
    <b-card @click="openFolder()">
      <div class="box">{{name}}</div>
    </b-card>
  </b-jumbotron>
</template>

<script>
import FolderService from "../../services/FolderService.js";

export default {
  props: ["name", "id"],
  methods: {
    openFolder(){
      //FolderService.getRootFolder();
      var folderId = '4b6c05d5-02e4-407d-9928-b5a2183d2886';
      FolderService.listSubFolders(folderId);
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
</style>
