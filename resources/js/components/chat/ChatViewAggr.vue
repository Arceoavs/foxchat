<template>
  <router-view v-bind:partner="partner"></router-view>
</template>

<script>
//import ChatView from "./ChatView.vue";

export default {
   props: {
    partner: {
      type: String,
      required: true
    }
  },
  components: {
    //ChatView
  }
};
</script>

<style>
</style>
