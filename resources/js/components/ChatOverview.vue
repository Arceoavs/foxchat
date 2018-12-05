<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <div>
          <b-card>
            <h3 class="left">{{provider}}</h3>
            <font-awesome-icon
              class="foxcolor right"
              icon="angle-right"
              size="2x"
              @click="showCollapse = !showCollapse"
              :class="showCollapse ? 'collapsed' : null"
              aria-controls="collapse"
              :aria-expanded="showCollapse ? 'true' : 'false'"
            />
          </b-card>
          <b-collapse class="mt-2" v-model="showCollapse" id="collapse">
            <b-card>Erster Chat!</b-card>
          </b-collapse>
          <b-collapse class="mt-2" v-model="showCollapse" id="collapse">
            <b-card>Zweiter Chat!</b-card>
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
      showCollapse: false
    };
  }
};
</script>

<style>
.right {
  float: right;
}
.left {
  float: left;
}
</style>
