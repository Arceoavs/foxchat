<template>
  <b-container>
    <div class="card text-center border-dark mt-3">
      <div class="card-body">
        <h5 class="card-title">Willkommen bei {{providerName}}</h5>
        <p class="card-text">Sie starten einen Chat zu folgendem Dokument:</p>
        <div class="textFox mt-4 mb-4">
          <font-awesome-icon icon="file" size="2x"/>
          <p class="card-text">{{documentName}}</p>
          <!--<p class="card-text">{{this.$route.params.docName}}</p>-->
        </div>
        <div>
          <button type="button" class="btn btn-success btn-md mr-1 buttonCC" @click="startChat()">Chat starten</button>
          <button type="button" class="btn btn-danger btn-md ml-1 buttonCC" @click="abort()">Abbruch</button>
          <!--<a href="/" class="btn btn-danger btn-md ml-1 buttonCC">Abbruch</a>-->
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  methods:{
    startChat(){
      alert("Sie starten nun einen Chat zu Dokument "+this.documentName);
      //TODO: Starte Chat zu Dokument
    },
    abort(){
      window.location.replace('/');
    }
  },
  data() {
    return {
      providerName: this.$route.params.provName,
      documentName: this.$route.params.docName
    };
  }
};
</script>

<style>
.buttonCC{
  width: 10em;
}
</style>