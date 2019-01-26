<template>
  <b-container fluid>
    <breadcrumb v-bind:items="items"></breadcrumb>
    <router-view></router-view>
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
