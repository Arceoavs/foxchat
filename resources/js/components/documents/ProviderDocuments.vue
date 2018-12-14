<template>
  <b-col>
    <b-breadcrumb :items="items"/>
    <b-container>
      <b-row class="mt-3">
        <b-col>
          <folder-component
            v-for="provider in providers"
            v-bind:key="provider.id"
            v-bind:name="provider.name"
            v-bind:href="'/myproviders/' + provider.name"
          ></folder-component>
        </b-col>
      </b-row>
    </b-container>
  </b-col>
</template>


<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
import FolderComponent from "./FolderComponent.vue";
import { store } from "../../store.js";

export default {
  data() {
    return {
      items: [
        {
          text: "Dokumente",
          href: "/index"
        },
        {
          text: "Meine Provider",
          href: ""
        }
      ],
    };
  },
  components: {
    FolderComponent,
    DocumentBreadcrumb
  },
  computed: {
    providers: function() {
      return store.state.providerList;
    }
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
