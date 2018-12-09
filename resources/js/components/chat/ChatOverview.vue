<template>
  <b-container>
    <div v-for="provider in providers" :key="provider.id">
      <chat-overview-component provider="provider.name"></chat-overview-component>
    </div>
  </b-container>
</template>

<script>
import ChatOverviewComponent from "./ChatOverviewComponent.vue";
export default {
  data() {
    return {
      providers: [
        {
          id: "1",
          name: "meine.versicherung"
        },
        {
          id: "2",
          name: "mein.arbeitgeber"
        }
      ]
    };
  },
  components: {
    ChatOverviewComponent
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
