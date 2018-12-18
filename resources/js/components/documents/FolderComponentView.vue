<template>
    <b-container>
    <b-breadcrumb :items="items"/>
        <b-card class="box">
        </b-card>
        <b-card class="box">
        </b-card>
    </b-container>
</template>

<script>
import FolderComponent from './FolderComponent.vue';

export default {
props: ["name"],
  data () {
    return {
        items:[{
          text: "Dokumente",
          href: "/Dokumente"
        },
        {
          text: "Provider",
          href: ""
        },
        {
          text: name,
        },
    ]}
  },
  
  components: FolderComponent,
}

</script>