<template>
  <b-container>
    <div class="card text-center border-dark mt-3">
      <div class="card-body">
        <h5 class="card-title" v-text= "$ml.get('willkommen_bei')"></h5>
        <h5> {{mlProviderName}} </h5>
        <p class="card-text" v-text="$ml.get('starting_chat_to_doc')"/>
        <div class="textFox mt-4 mb-4">
          <font-awesome-icon icon="file" size="2x"/>
          <p class="card-text">{{documentName}}</p>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-success btn-md mr-1 buttonCC"
            @click="startChat()"
            v-text="$ml.get('chat_starten')"
          ></button>
          <button
            type="button"
            class="btn btn-danger btn-md ml-1 buttonCC"
            @click="abort()"
            v-text="$ml.get('abbruch')"
          ></button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { store } from "../store.js";

export default {  
  methods: {
    startChat() {
      var communicationUrl = { userName: this.providerName, conversationTag: this.documentName };
      store.commit("setCommunicationUrl", communicationUrl);
      this.$router.push({name: 'ChatViewUser'});
    },
    abort() {
      this.$router.push({name: 'Dokumente'});
    }
  },
  data() {
    return {
      providerName: this.$route.params.provName,
      documentName: this.$route.params.docName
    };
  },
  computed: {
    mlProviderName() {
      return this.providerName;
    }
  }
};
</script>

<style>
.buttonCC {
  width: 10em;
}
</style>
