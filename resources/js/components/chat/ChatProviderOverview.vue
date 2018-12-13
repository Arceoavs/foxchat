<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <!-- Chats -->
        <chat-provider-component
          v-for="chatItem in chats"
          v-bind:key="chatItem.id"
          v-bind:documentName="chatItem.document"
          v-bind:timeStamp="chatItem.date"
          v-bind:userName="chatItem.userName"
        ></chat-provider-component>
        <!-- Add chat -->
        <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">
          <b-card>
            <h4 class="left textColor">{{addChat}}</h4>
            <div class="cardIcon textFox">
              <font-awesome-icon icon="plus-circle" size="2x"/>
            </div>
          </b-card>
        </b-jumbotron>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChatProviderComponent from "./ChatProviderComponent.vue";
export default {
  data() {
    return {
      chats: [
        {
          id: "1",
          document: 'Chat zu "Dok. 123"',
          date: "30.11.2018",
          userName: "Dietrich"
        },
        {
          id: "2",
          document: 'Chat zu "Dok. 456"',
          date: "06.12.2018",
          userName: "Jacqueline"
        },
        {
          id: "3",
          document: 'Chat zu "Dok. 789"',
          date: "11.12.2018",
          userName: "Max Mustermann"
        }
      ],
      addChat: "Neuen Chat starten"
    };
  },
  components: {
    ChatProviderComponent
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