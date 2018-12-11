<template>
  <b-col>
      <b-breadcrumb :items="items"/>
      <b-list-group class="card">
        <b-list-group-item href=/mydocuments class ="box">Eigene Dokumente</b-list-group-item>
        <b-list-group-item href=/myproviders class ="box">Meine Provider</b-list-group-item>
        <b-list-group-item href=/mostrecent class ="box">Letzte Dokumente</b-list-group-item>
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
        href: ''
      }]
    }
  }
}
</script>

<style>
.box{
  color:#f86a2d !important;
}
.card{
  padding: 0.1em;
  margin: 0.1em;
}

</style>
