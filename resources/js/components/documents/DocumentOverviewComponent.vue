<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
          <router-link :to="{name: 'myproviders'}" class="box" append>            
            <b-jumbotron bg-variant="secondary" class="chatGroup">
              <b-card class="box">
                <h3 class="left textColor">{{myProvidersTitle}}</h3>
                <font-awesome-icon class="cardIcon textFox" icon="angle-right" size="2x"/>
              </b-card>
            </b-jumbotron>
          </router-link>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-4 pl-3">
        <b-col>
          <h2 class="textColor">{{lastDocumentTitle}}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-jumbotron bg-variant="secondary" class="chatGroup">
            <document-list-component
              v-for="document in documents"
              v-bind:key="document.id"
              v-bind:name="document.name"
            ></document-list-component>
          </b-jumbotron>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
import DocumentListComponent from "./DocumentListComponent.vue";
import recentDocuments from "./recentDocuments.js";

export default {
  data() {
    return {

      showCollapse: false,
      documents: recentDocuments,
      lastDocumentTitle: "neueste Dokumente",
      myProvidersTitle: "meine Provider"
    };
  },
  components: {
    DocumentBreadcrumb,
    DocumentListComponent
  },
  computed: {
    dropdownArrow() {
      let arrow = "rotate-down";
      if (this.showCollapse === true) {
        return arrow;
      }
      return true;
    }
  }
};
</script>

<style>
.box {
  color: rgba(108, 117, 125, 1) !important;
  text-decoration: none !important;
}
.box :hover {
  cursor: pointer;
  color: #f86a2d !important;
}
.chatIcon {
  min-width: 3em;
}
.chatGroup {
  padding: 0.3em;
  margin: 0.3em;
  background-color: rgba(90, 83, 83, 0.1) !important;
}
.rotate-down {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
