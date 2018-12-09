<template>
  <b-container>
    <chat-overview-component
      v-for="provideritem in providers"
      v-bind:key="provideritem.id"
      v-bind:provider="provideritem.name"
      v-bind:documentChats="provideritem.documentChats"
    ></chat-overview-component>
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
          name: "meine.versicherung",
          documentChats: [
            {
              id: "1",
              title: "Versicherungsvertrag 1"
            },
            {
              id: "2",
              title: "Abrechnung vom 06.12.2018"
            }
          ]
        },
        {
          id: "2",
          name: "mein.arbeitgeber",
          documentChats: [
            {
              id: "1",
              title: "Gehaltsabrechnung Dezember 2018"
            }
          ]
        },
        {
          id: "3",
          name: "D.velop"
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
