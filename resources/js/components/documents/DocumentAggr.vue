<template>
  <div>
    <breadcrumb v-bind:items="items"></breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb.vue";

export default {
  computed: {
    items: function() {
      return [
        {
          text: "Dokumente"
          //to: { name: "Dokumente" }
        },
        {
          text: "Child"
          //to: { name: "children" }
        }
      ];
    }
  },
  components: {
    Breadcrumb
  }
};
</script>
