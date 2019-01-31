<template>
<!-- In this view the document components are displayed under the /documents route -->
  <b-container fluid>
    <!-- breadcrumbs are displayed to show the path of the current folder (for subfolders) -->
    <breadcrumb v-bind:items="items"/>
    <!-- router view can be either Document view (root level) or FolderChildComponents (subfolders) -->
    <router-view/>
  </b-container>
</template>

<script>
import Breadcrumb from "../components/documents/Breadcrumb.vue";

export default {
  computed: {
    items: function() {
      //get current route, split the components and delete the - and / characters with a regex expression
      var routePath = this.$route.path.split(/[-\/\/]/);
      // console.log(routePath);
      var breadcrumbPath = [];

      routePath.map(function(item) {
        if (item != "" && item != "Documents")
          breadcrumbPath.push({
            text: item
          });
      });
      console.log(JSON.stringify(breadcrumbPath));

      return breadcrumbPath;
    }
  },
  components: {
    Breadcrumb
  }
};
</script>
