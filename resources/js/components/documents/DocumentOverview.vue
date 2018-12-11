<template>
    <b-card-group deck>
      <document-overview-component
        v-for="documentitem in documents"
        v-bind:key="documentitem.id"
        v-bind:document="documentitem.name"
      >
      </document-overview-component>
    </b-card-group>
</template>

<script>
import DocumentOverviewComponent from "./DocumentOverviewComponent";
export default{
  data(){
    return{

    };
  },

  components: {
    DocumentOverviewComponent
  } 
}
</script>


<style>
</style>
