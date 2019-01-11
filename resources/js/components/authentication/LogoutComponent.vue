<template>
  <b-nav-item right class="logout-link" v-on:click="logout()">
    <a class="foxcolor" v-text="$ml.get('abmelden')"/>
  </b-nav-item>
</template>

<script>
import auth from "../../services/AuthService.js";

export default {
  data() {
    return {
    };
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
