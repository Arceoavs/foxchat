<template>
  <b-link-group>
    <document-overview-component
      v-for="documentitem in documents"
      v-bind:key="documentitem.id"
      v-bind:documents="documentitem.name"
    >
    </document-overview-component>
  </b-link-group>
</template>


<script>
import DocumentOverviewComponent from "./DocumentOverviewComponent";
export default {
  data() {
    return {
      documents: [
        {
          id: "1",
          name: "test",
        }
      ]
    };
  },
  
  components: {
    DocumentOverviewComponent
  }
};
</script>

<style>
.cardIcon {
  float: right;
}
.left {
  float: left;
}
</style>
