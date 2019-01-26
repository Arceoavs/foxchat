<template>
  <div class="overlay" v-show="counter > 0">
    <div class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
import EventBus from "../services/event-bus.js";

export default {
  data: function() {
    return {
      counter: 0
    };
  },
  mounted() {
    EventBus.$on("loading", payload => {
      this.counter++;
    });

    EventBus.$on("loaded", payload => {
      if (this.counter >= 1) {
        this.counter--;
      }
    });
  }
};
</script>
