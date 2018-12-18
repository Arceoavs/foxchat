<template>
  <b-row class="mt-1">
    <b-col>
      <b-card class="listcomponent">
        <font-awesome-icon class="fox" icon="file" size="2x"/>
        <button type="button" class="listcomponent" @click="openDocument()">{{name}}</button>
        <div class="cardIcon textFox">
          <button type="button" class="listcomponent" @click="startChat()">Chat starten</button>
          <font-awesome-icon class="fox" icon="comments" size="2x"/>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

 <script>
export default {
  props: ["name"],
  methods: {
    openDocument() {
      alert("Dokument " + this.name + " wird heruntergeladen");
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
  border: none;
  color: rgba(108, 117, 125, 1) !important;
  text-decoration: none;
  margin: 0.2em !important;
}
.listcomponent :hover {
  color: #f86a2d !important;
}
</style>
