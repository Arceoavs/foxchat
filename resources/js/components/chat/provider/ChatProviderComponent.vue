<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <!-- Chats -->
        <chat-provider-list-component
          v-for="chatItem in chats"
          v-bind:key="chatItem.thread.conversation_id"
          v-bind:documentName="chatItem.thread.conversation_tag"
          v-bind:message="chatItem.thread.message"
          v-bind:date="chatItem.thread.updated_at"
          v-bind:userName="chatItem.withUser.name"
          v-on:chat-partner-changed="informChatComponent"
        ></chat-provider-list-component>
        <add-chat-provider
          v-for="subscriber in subscribers"
          v-bind:key="subscriber.SubscriptionId"
          v-bind:userName="subscriber.UserName"
          v-on:chat-partner-changed="informChatComponent"
        ></add-chat-provider>
        <div v-if="chats.length==0 && subscribers.length==0" class="text-center">
          <p v-text="$ml.get('keine_User_msg')"/>
        </div>
      </b-col>
      <router-view></router-view>
    </b-row>
  </b-container>
</template>

<script>
import ChatProviderListComponent from "./ChatProviderListComponent.vue";
import AddChatProvider from "./AddChatProvider.vue";

export default {
  props: [],
  created() {},
  components: {
    ChatProviderListComponent,
    AddChatProvider
  },
  computed: {
    chats: function() {
      return this.$store.state.inboxForProvider;
    },
    subscribers: function() {
      return this.$store.state.subscriberList;
    }
  },
  methods: {
    informChatComponent(e) {
      this.$emit("chat-partner-changed", e);
    }
  }
};
</script>

<style>
</style>
