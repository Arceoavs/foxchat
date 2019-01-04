<template>
  <b-col>
    <b-breadcrumb :items="items"/>
    <b-container>
      <b-row>
        <b-col>
          <folder-component
            v-for="provider in providers"
            v-bind:key="provider.Id"
            v-bind:id="provider.Id"
            v-bind:name="provider.Name"
          ></folder-component>
          <document-component
            v-for="document in documents"
            v-bind:key="document.Id"
            v-bind:id="document.Id"
            v-bind:name="document.Name">
          </document-component>
        </b-col>
      </b-row>
    </b-container>
  </b-col>
</template>


<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
import FolderComponent from "./FolderComponent.vue";
import { store } from "../../store.js";
import ChatOverviewAPI from "../../services/FoxdoxGeneralService.js";
import FolderService from "../../services/FolderService";
import DocumentService from '../../services/DocumentService';
import DocumentComponent from "./DocumentComponent.vue";
import recentDocuments from "./recentDocuments.json";
import recentFolders from "./recentFolders.json";

export default {
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
      providers: recentFolders.Items,
      documents: recentDocuments.Items
    };
  },
  components: {
    FolderComponent,
    DocumentComponent,
    DocumentBreadcrumb
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