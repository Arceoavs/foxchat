<template>
  <!-- <span class="foxcolor " v-text="$ml.get('abmelden')"/> -->
  <button class="btn logout-btn" v-text="$ml.get('abmelden')" v-on:click="logout()"/>
</template>

<script>
import auth from "../../services/AuthService.js";

export default {
  data() {
    return {};
  },
  methods: {
    logout: function() {
      console.log("Logging Out...");
      auth.logout(this);
    }
  },
  mounted() {
    console.log("Login Component mounted.");
  }
};
</script>

<style>
.logout-btn {
  background: #f86a2d;
  border-color: #f86a2d;
  color: white !important;
  width: 120px;
  font-size: 100%;
  line-height: 250%;
  padding: 0px;
}
@media (max-width: 767px) {
  .logout-btn {
    background: #f86a2d;
    border-color: #f86a2d;
    color: white !important;
    width: 100%;
    font-size: 100%;
    line-height: 250%;
    padding: 0px;
  }
}
</style>

