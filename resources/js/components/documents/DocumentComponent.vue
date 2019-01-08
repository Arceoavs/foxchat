<template>
  <b-card class="box">
    <font-awesome-icon class="fox" icon="file" size="2x"/>
    <button type="button" class="listcomponent" @click="openDocument()">{{name}}</button>
    <div class="cardIcon textFox">
      <button type="button" class="listcomponent" @click="startChat()">Chat starten</button>
      <font-awesome-icon class="fox" icon="comments" size="2x"/>
    </div>
  </b-card>
</template>

 <script>
 import DocumentService from '../../services/DocumentService.js';
export default {
  props: ["id", "name"],
  methods: {
    openDocument() {
      alert("Dokument " + this.id + " wird heruntergeladen");
      // DocumentService.downloadDocument(this.id);
    },
    startChat() {
      alert("Sie starten nun einen Chat zu Dokument " + this.name);
    }
  }
};
</script>
 
 <style>
.fox {
  color: #f86a2d !important;
}

.listcomponent {
  font-size: 16pt;
  font-weight: 400;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  color: rgba(86, 86, 86, 1) !important;
  text-decoration: none;
  margin: 0.2em !important;
}
.listcomponent :hover {
  color: #f86a2d !important;
}

.box {
  border: none;
  outline: none;
  color: rgba(108, 117, 125, 1) !important;
  text-decoration: none;
  margin: 0.2em !important;
}
</style>
