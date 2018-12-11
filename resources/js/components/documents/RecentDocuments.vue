<template>
  <b-col>
    <div class="document-breadcrumb">
      <b-breadcrumb :items="items"/>
    </div>
      <b-list-group>
        <b-list-group-item href=/mydocuments>Eigene Dokumente</b-list-group-item>
        <b-list-group-item href=/myproviders>Meine Provider</b-list-group-item>
        <b-list-group-item href=/mostrecent>Letzte Dokumente</b-list-group-item>
      </b-list-group>
  </b-col>
</template>


<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
export default {
  data () {
    return {
      items: [{
        text: 'Dokumente',
        href: '/index'
      }, {
          text: 'Letzte Dokumente',
          href: ''
      }]
    }
  }
}
</script>

<style>

</style>
