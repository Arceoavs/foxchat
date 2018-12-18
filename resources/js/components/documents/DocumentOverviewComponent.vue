<template>
  <b-col>
      <b-breadcrumb :items="items"/>
    
    <b-card
      class="box"
      @click="showCollapse = !showCollapse"
      :class="showCollapse ? 'collapsed' : null"
      aria-controls="collapse"
      :aria-expanded="showCollapse ? 'true' : 'false'"
    >
      <div class="box">Letzte Dokumente</div>
      <font-awesome-icon
        class="cardIcon textFox"
        icon="angle-right"
        size="2x"
        :class="dropdownArrow"
      />

    </b-card>

      <b-collapse class="box" v-model="showCollapse" id="collapse">

      <!-- Recent documents -->
        <document-list-component
          v-for="document in documents"
          v-bind:key="document.id"
          v-bind:name="document.name"
        >
        </document-list-component>

    </b-collapse>

    <router-link to="/Provider" class="box">
    <b-card
      class="box">
    <div class="box">Meine Provider</div>
    </b-card>
    </router-link>

  </b-col>
</template>


<script>
import DocumentBreadcrumb from "./DocumentBreadcrumb.vue";
import DocumentListComponent from "./DocumentListComponent.vue";
import recentDocuments from "./recentDocuments.js";

export default {
  data () {
    return {
      items: [{
        text: 'Dokumente',
        href: ''
      }],
      showCollapse: false,
      documents: recentDocuments
    }
  },
  components:{
    DocumentBreadcrumb,
    DocumentListComponent
  },
  computed:{
    dropdownArrow() {
      let arrow = "rotate-down";
      if (this.showCollapse === true) {
        return arrow;
      }
      return true;
    }
  },
}
</script>

<style>
.box{
  color:rgba(108, 117, 125, 1) !important;
  text-decoration: none !important;
  padding: 0.1em;
  margin: 0.1em;
}
.box :hover{
  cursor: pointer;
  color:#f86a2d !important;
}

.rotate-down {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

</style>
