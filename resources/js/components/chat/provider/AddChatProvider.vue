<template>
    <b-jumbotron bg-variant="secondary" class="chatGroup mt-3">   
        <b-card>
        <router-link
          :to="'/chat/communication?partner='+this.username+'&tag=allgemein'"
          class="textColor chat-overview-link">
            <b-row>
                <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
                <font-awesome-icon icon="plus-circle" size="2x"/>
                </b-col>
                <b-col><h4 class="textColor" v-text = "$ml.get('add_chat') + ' ' +this.username" /></b-col>
            </b-row>
        </router-link>
        </b-card>
    </b-jumbotron>
</template>

<script>
import ChatListComponent from "../client/ChatListComponent.vue";

export default {
    props: ["username"],
    mounted() {
        console.log('AddChatProvider mounted');
    },
};
</script>

<style>
.chatIcon {
  min-width: 3em;
}
.right {
  float: right;
}
.left {
  float: left;
}
</style>