<template>
  <b-container>
    <aggr-chat-provider-component></aggr-chat-provider-component>
    <router-view></router-view>
  </b-container>
</template>

<script>
import AggrChatProviderComponent from "./AggrChatProviderComponent.vue";

export default {
  components: {
    AggrChatProviderComponent
  }
};
</script>

