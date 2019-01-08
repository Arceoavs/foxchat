<template>
  <router-link v-bind:to="{ path: name}" append>
    <b-card class="box">
      <font-awesome-icon class="fox" icon="folder-open" size="2x"/>
      <button type="button" class="listcomponent" @click="openFolder()">{{name}}</button>
    </b-card>
  </router-link>
</template>

 <script>
import DocumentService from "../../services/DocumentService.js";
import FolderService from "../../services/FolderService.js";
import Folder from "../../model/folder.js";

export default {
  props: ["id", "name"],
  mounted(){
  },
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
.fox {
  color: #f86a2d !important;
}

.listcomponent {
  font-size: 16pt;
  font-weight: 400;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  color: rgba(86, 86, 86, 1) !important;
  text-decoration: none;
  margin: 0.2em !important;
}
.listcomponent :hover {
  color: #f86a2d !important;
}

.box {
  border: none;
  outline: none;
  color: rgba(108, 117, 125, 1) !important;
  text-decoration: none;
  margin: 0.2em !important;
}
</style>
