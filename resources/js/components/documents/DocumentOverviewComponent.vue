<template>
  <!-- Zeigt die Dokumente und Ordner der obsersten Ebene, sowie die letzten 5 verwendeten Dokumente in der Dokumentenansicht an -->
  <b-container>
    <b-row>
      <b-col>
        <b-row class="mt-4 pl-3">
          <b-col>
            <h2 class="textColor" v-text="$ml.get('lastFiveDocsTitle')"/>
          </b-col>
        </b-row>
        <b-card>
          <!-- Die 5 zuletzt hinzugefügten Dokumente-->
          <b-list-group flush>
            <document-component
              v-for="document in lastFive"
              v-bind:key="document.Id"
              v-bind:id="document.Id"
              v-bind:name="document.Name"
              v-bind:folderPath="document.FolderPath"
            />
          </b-list-group>
        </b-card>
        <b-row class="mt-4 pl-3">
          <b-col>
            <h2 class="textColor" v-text="$ml.get('last_document_title_doc_overview')"/>
          </b-col>
        </b-row>
        <b-card>
          <!-- Dokumente auf root- Ebene -->
          <b-list-group flush>
            <document-component
              v-for="document in documents"
              v-bind:key="document.Id"
              v-bind:id="document.Id"
              v-bind:name="document.Name"
              v-bind:folderPath="document.FolderPath"
            />
            <!-- Ordner auf root- Ebene -->
            <folder-component
              v-for="folder in folders"
              v-bind:key="folder.Id"
              v-bind:id="folder.Id"
              v-bind:name="folder.Name"
            />
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import DocumentComponent from "./DocumentComponent.vue";
import FolderService from "../../services/FolderService";
import FolderComponent from "./FolderComponent.vue";
import FolderChildComponent from "./FolderChildComponent.vue";

export default {
  data() {
    return {
      showCollapse: false
    };
  },
  mounted() {
    FolderService.getAllDocuments();
  },
  computed: {
    lastFive: function() {
      return this.$store.state.lastFiveDocuments;
    },
    documents: function() {
      return this.$store.state.recentDocuments;
    },
    folders: function() {
      console.log(
        "Alle Folders:" + JSON.stringify(this.$store.state.recentFolders.Items)
      );
      return this.$store.state.recentFolders.Items;
    },
    providers: function() {
      return this.$store.state.inboxForUser;
    },
    dropdownArrow() {
      let arrow = "rotate-down";
      if (this.showCollapse === true) {
        return arrow;
      }
      return true;
    }
  },
  methods: {},
  components: {
    DocumentComponent,
    FolderComponent,
    FolderChildComponent
  }
};
</script>

<style>
/* Von der Dokumentenansicht verwendete Styles */
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
