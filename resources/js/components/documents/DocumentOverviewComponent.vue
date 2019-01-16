<template>
  <b-container>
    <b-row>
      <b-col>
        <b-row class="mt-4 pl-3">
          <b-col>
            <h2 class="textColor" v-text="Zuletzt hinzugefügt"/>
          </b-col>
        </b-row>
        <b-card>
          <b-list-group flush>
            <document-component
              v-for="document in lastFive"
              v-bind:key="document.Id"
              v-bind:id="document.Id"
              v-bind:name="document.Name"
            />
          </b-list-group>
        </b-card>
        <b-row class="mt-4 pl-3">
          <b-col>
            <h2 class="textColor" v-text="$ml.get('last_document_title_doc_overview')"/>
          </b-col>
        </b-row>
        <b-card>
          <b-list-group flush>
            <document-component
              v-for="document in documents"
              v-bind:key="document.Id"
              v-bind:id="document.Id"
              v-bind:name="document.Name"
            />
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
  mounted(){
     FolderService.getAllDocuments();
  },
  computed: {
    lastFive: function(){
       return store.state.lastFiveDocuments;
    },
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
