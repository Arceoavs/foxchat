<template>
  <!-- Zeigt eine Ordnerliste auf oberster Ebene der Dokuementenansicht an -->
  <b-list-group-item href="#" @click="openFolder()">
    <font-awesome-icon class="fox" icon="folder-open" size="2x"/>
    <button type="button" class="listcomponent">{{name}}</button>
  </b-list-group-item>
</template>

 <script>
import DocumentService from "../../services/DocumentService.js";
import FolderService from "../../services/FolderService.js";
import Folder from "../../model/folder.js";

export default {
  props: ["id", "name"],
  mounted() {},
  methods: {
    /**
     * Wenn ein Ordner angeklickt wird, soll der aktuelle Unterordner im store aktualisiert werden (Ordner und Dokumente).
     * Anschliessend wird die Dokumentenansicht in diesen Ordner navigiert
     */
    openFolder() {
      console.log(this.buildURL());
      FolderService.getSubFolders(this.id).data;
      FolderService.getDocuments(this.id);
      this.$router.push({
        // Der Unterordner wird durch eine FolderChildComponent abgebildet
        name: "FolderChild",
        params: { name: this.buildURL() }
      });
    },
    /**
     * Builds the URL for an subfolder.
     * Appends the name of the subfolder without spaces to the current route that begins after the /documents/ part
     */
    buildURL() {
      return this.$route.path.substring(11) + "-" + this.name.replace(/ /g, "");
    }
  }
};
</script>

 <style>
/* In der Ordneransicht verwendete Styles */
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
