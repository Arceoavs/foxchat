<template>
  <b-container>
    <b-row>
      <b-col>
        <b-jumbotron bg-variant="secondary" class="chatGroup">
          <folder-component
            v-for="folder in folders"
            v-bind:key="folder.Id"
            v-bind:id="folder.Id"
            v-bind:name="folder.Name"
          ></folder-component>
        </b-jumbotron>

    <b-row class="mt-4 pl-3">
      <b-col>
        <h2 class="textColor" v-text="$ml.get('last_document_title_doc_overview')"/>
      </b-col>
    </b-row>
        <b-jumbotron bg-variant="secondary" class="chatGroup">
          <document-component
            v-for="document in documents"
            v-bind:key="document.Id"
            v-bind:id="document.Id"
            v-bind:name="document.Name"
          ></document-component>
        </b-jumbotron>

        
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import DocumentComponent from "./DocumentComponent.vue";
import FolderService from "../../services/FolderService";
import { store } from "../../store.js";
import FolderComponent from "./FolderComponent.vue";
import FolderChildComponent from "./FolderChildComponent.vue";
import ProviderComponent from "./ProviderComponent.vue";

export default {
  data() {
    return {
      showCollapse: false
    };
  },
  computed: {
    documents: function() {
      return store.state.recentDocuments;
    },
    folders: function() {
      console.log(
        "Alle Folders:" + JSON.stringify(store.state.recentFolders.Items)
      );
      return store.state.recentFolders.Items;
    },
    providers: function() {
      //return store.state.providerList;
      return store.state.inboxForUser;
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
    ProviderComponent,
    FolderChildComponent
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
