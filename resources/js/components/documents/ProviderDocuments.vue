<template>
  <b-card>
    <router-link :to="{name:'children'}" append><p>lol</p>
    <router-view></router-view>
    </router-link>
  </b-card>
</template>

<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
import FolderComponent from "./FolderComponent.vue";
import { store } from "../../store.js";

export default {
  data() {
    console.log(this.$route);
    console.log(this.$route.currentRoute);
    return {
    };
  },
  components: {
    FolderComponent,
    DocumentBreadcrumb
  },
  computed: {
    providers: function() {
      console.log(store.state.inboxForUser)
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
