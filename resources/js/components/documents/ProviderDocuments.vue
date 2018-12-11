<template>
  <b-col>
    <div class="document-breadcrumb">
      <b-breadcrumb :items="items"/>
    </div>
      <b-list-group>
        <b-list-group-item href=/mydocuments>Eigene Dokumente</b-list-group-item>
        <b-list-group-item href=/myproviders>Meine Provider</b-list-group-item>
        <b-list-group-item>Letzte Dokumente</b-list-group-item>
      </b-list-group>
      <document-overview-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.id"
          v-bind:provider="provideritem.name"
        ></document-overview-component>
  </b-col>
</template>


<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
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
    providers: returnProviderList()
    };
  },
}
</script>

<style>

</style>
