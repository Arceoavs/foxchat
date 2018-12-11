<template>
  <b-col>
      <b-breadcrumb :items="items"/>
    <b-container>
    <b-row class="mt-3">
      <b-col>
        <folder-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.id"
          v-bind:name="provideritem.name"
          v-bind:href="'/myproviders/' + provideritem.name"
        ></folder-component>
      </b-col>
    </b-row>
  </b-container>
  </b-col>
</template>


<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
import DocumentComponent from "./DocumentComponent.vue";
import FolderComponent from "./FolderComponent.vue";
import { returnProviderList } from "../../services/ChatOverviewService.js";

export default {
  data() {
    return {
    items: [{
        text: 'Dokumente',
        href: '/index'
      }, {
          text: 'Meine Provider',
          href: ''
      }],
      providers: null
    };
  },
  components: {
    FolderComponent,
    DocumentComponent,
    DocumentBreadcrumb
  },
  mounted() {
    var providerListIsComing = new Promise(function(resolve, reject) {
      if (localStorage.getItem("chatOverviewProviderList") != null) {
        resolve();
      } else {
        reject();
      }
    });

    providerListIsComing.then(
      (this.providers = JSON.parse(
        localStorage.getItem("chatOverviewProviderList")
      ))
    );

    console.log("In local Storage: ");
  }
};
</script>

<style>
</style>
