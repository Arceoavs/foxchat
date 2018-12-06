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
            <b-card class="textColor">
              {{generalChat}}
              <div class="cardIcon textFox">
                <font-awesome-icon icon="comments" size="2x"/>
              </div>
            </b-card>
          </b-collapse>
          <b-collapse class="mt-2 ml-5" v-model="showCollapse" id="collapse">
            <b-card class="textColor">
              {{addChat}}
              <div class="cardIcon textFox">
                <font-awesome-icon icon="plus-circle" size="2x"/>
              </div>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      provider: "d.velop",
      generalChat: "Allgemeiner Chat",
      addChat: "Chat hinzufügen",
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
