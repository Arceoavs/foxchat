<template>
  <b-list-group-item>
    <font-awesome-icon class="fox" icon="file" size="2x"/>
    <button type="button" class="listcomponent" @click="openDocument()">{{name}}</button>
    <div v-if="isFromProvider" class="cardIcon textFox">
      <button type="button" class="listcomponent" @click="startChat()">
        <font-awesome-icon class="fox" icon="comments" size="2x"/>
      </button>
    </div>
  </b-list-group-item>
</template>

 <script>
import DocumentService from "../../services/DocumentService.js";
export default {
  props: ["id", "name", "folderPath"],
  data(){
    var providerName = DocumentService.getProviderName(this.folderPath);
    if (typeof providerName !== 'undefined') return {isFromProvider : true};
    else return {isFromProvider : false};
  },
  methods: {
    openDocument() {
      // alert("Dokument " + this.id + " wird freigegeben");
      DocumentService.publishDocument(this.id);
      DocumentService.downloadPublicDocument(this.id, this.name);
    },
    startChat() {
      //alert("Sie starten nun einen Chat zu Dokument " + this.name);

      //TODO: Dokumentfreigabe -> LINK UEBERGEBEN
      var publicUrl = DocumentService.publishDocument(this.id);

      var providerName = DocumentService.getProviderName(this.folderPath);
  
      this.$router.push({
        name: "ConfirmChatToDocument",
        params: { docName: this.name, provName: providerName }
      });
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
