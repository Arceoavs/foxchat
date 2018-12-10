<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <div>
          <b-card
            @click="showCollapse = !showCollapse"
            :class="showCollapse ? 'collapsed' : null"
            aria-controls="collapse"
            :aria-expanded="showCollapse ? 'true' : 'false'"
          >
            <h4 class="left textColor">{{provider}}</h4>
            <font-awesome-icon class="cardIcon textFox" icon="angle-right" size="2x"/>
          </b-card>
          <b-collapse class="mt-2 ml-5" v-model="showCollapse" id="collapse">
            <router-link to="/document/download">
              <b-card class="textColor">
                {{document}}
                <div class="cardIcon textFox">
                  <font-awesome-icon icon="comments" size="2x"/>
                </div>
              </b-card>
            </router-link>
          </b-collapse>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import documentService from "../services/DocumentService.js";
export default {
  data() {
    return {
      provider: "meine.versicherung",
      document: documentService.getDocumentsByFolderId('d787dc74-f7b4-456a-b622-6cd3ba5d047f'),
      showCollapse: false
    };
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