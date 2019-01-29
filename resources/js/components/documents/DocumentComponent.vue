<template>
  <b-list-group-item>
    <font-awesome-icon class="fox" icon="file" size="2x"/>
    <button type="button" class="listcomponent" @click="openDocument()">{{name}}</button>
    <div class="cardIcon textFox">
      <b-form inline>
        <b-input
          id="input-valid"
          :state="true"
          type="text"
          v-bind:value="publicLink"
          v-if="isPublished"
          onFocus="this.select()"
          onClick="this.select()"
        />
        <b-button type="button" class="listcomponent" @click="shareDocument()" v-if="toPublish&&isFromProvider">
          <font-awesome-icon class="fox" icon="share-square" size="1x"/>
        </b-button>
        <button type="button" v-if="isFromProvider" class="listcomponent" @click="startChat()">
          <font-awesome-icon class="fox" icon="comments" size="1x"/>
        </button>
      </b-form>
    </div>
  </b-list-group-item>
</template>

 <script>
import DocumentService from "../../services/DocumentService.js";
export default {
  props: ["id", "name", "folderPath"],
  data: function() {
    var providerName = DocumentService.getProviderName(this.folderPath);
    if (providerName)
      return {
        isFromProvider: true,
        isPublished: false,
        toPublish: true,
        publicLink: "loading"
      };
    else
      return {
        isFromProvider: false,
        isPublished: false,
        toPublish: true,
        publicLink: "loading"
      };
  },
  methods: {
    openDocument() {
      // DocumentService.publishDocument(this.id);
      // DocumentService.downloadPublicDocument(this.id, this.name);
      DocumentService.downloadDocument(this.id, this.name);
    },
    shareDocument() {
      DocumentService.publishDocument(this.id).then(data => {
        this.publicLink = data;
      });
      this.isPublished = true;
      this.toPublish = false;
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
