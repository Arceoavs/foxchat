<!-- <template>
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
-->

<template>
  <div>
    <Tree id="my-tree-id" :custom-options="myCustomOptions" :custom-styles="myCustomStyles" :nodes="treeDisplayData"></Tree>
  </div>
</template>


<!--
<script>
import documentService from "../services/DocumentService.js";
export default {
  data() {
    return {
      provider: "meine.versicherung",
      document: documentService.getDocumentsByFolderId('d787dc74-f7b4-456a-b622-6cd3ba5d047f'),
      showCollapse: false
    };
  },
-->

<script>

export default {
data() {
  treeDisplayData: [
    {
      text: 'Root 1',
      nodes: [
        {
          text: 'Child 1',
          nodes: [
            {
              text: 'Grandchild 1'
            },
            {
              text: 'Grandchild 2'
            }
          ]
        },
        {
          text: 'Child 2'
        }
      ]
    },
    {
      text: 'Root 2'
    }
  ];
},

  components: {
    'vuejs-tree': Tree
  },

  methods: {
      getTree: function(treeId) {
        for (let i = 0; i < this.$children.length; i++) {
          if (this.$children[i].$props.id == treeId) return this.$children[i]
        }
      }
  }
};
</script>

<!--
<style>
.cardIcon {
  float: right;
}
.left {
  float: left;
}
</style>
-->