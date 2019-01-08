<template>
  <b-col>
    <b-breadcrumb :items="items"/>
    <b-container>
      <b-row>
        <b-col>
          <folder-component
            v-for="folder in folders"
            v-bind:key="folder.Id"
            v-bind:id="folder.Id"
            v-bind:name="folder.Name"
          ></folder-component>
          <document-component
            v-for="document in documents"
            v-bind:key="document.Id"
            v-bind:id="document.Id"
            v-bind:name="document.Name"
          ></document-component>
        </b-col>
      </b-row>
    </b-container>
  </b-col>
</template>


<script>
import FolderComponent from "./FolderComponent.vue";
import { store } from "../../store.js";
import ChatOverviewAPI from "../../services/FoxdoxGeneralService.js";
import FolderService from "../../services/FolderService";
import DocumentService from "../../services/DocumentService";
import DocumentComponent from "./DocumentComponent.vue";


export default {
  props: ["name", "id"],
  data() {
    return {
      items: [
        {
          text: "Dokumente",
          href: "/documents"
        },
        {
          text: "Meine Provider",
          href: ""
        }
      ],
      folders: recentFolders.Items,
      documents: recentDocuments.Items
    };
  },
  computed: {
    documents: function() {
      return store.state.recentDocuments;
    },
    folders: function() {
      return store.state.recentDocuments;
    }
  },
  components: {
    FolderComponent,
    DocumentComponent
  }
};
</script>

<style>
.box {
  color: #f86a2d !important;
  padding: 0.1em;
  margin: 0.1em;
}
</style>
