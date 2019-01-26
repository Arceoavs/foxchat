<template>
  <b-container>
    <b-row class="mt-4 pl-2">
      <b-col>
        <h2
          v-if="providers.length==1"
          class="textColor"
          v-text="$ml.get('chat_client_overview_title')"
        />
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <div v-if="providers.length==0" class="text-center">
          <p v-text="$ml.get('keine_Provider_msg')"/>
        </div>
        <chat-list-component
          v-for="provideritem in providers"
          v-bind:key="provideritem.ProviderShortName"
          v-bind:userName="provideritem.ProviderShortName"
          v-bind:documentChats="provideritem.documentChats"
          v-bind:generalChat="provideritem.generalChat"
          v-on:chat-partner-changed="changeRoute"
        />
        <add-chat-component/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatListComponent from "./ChatList.vue";
import ChatService from "../../../services/ChatService";
import AddChatComponent from "./AddChat.vue";

export default {
  data() {
    return {
      //pageTitle: "Ihre Chats mit Providern"
    };
  },
  created() {
    ChatService.getInbox();
  },
  components: {
    ChatListComponent,
    AddChatComponent
  },
  computed: {
    providers: function() {
      return this.$store.state.inboxForUser;
    }
  },
  methods: {
    changeRoute(e) {
      var communicationUrl = { userName: e.userName, conversationTag: e.tag };
      this.$store.commit("setCommunicationUrl", communicationUrl);
      this.$router.push({
        name: "ChatViewUser"
      });
    }
  }
};
</script>

<style>
</style>
