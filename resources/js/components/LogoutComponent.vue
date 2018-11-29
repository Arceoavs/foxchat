<template>
  <button type="button" class="btn btn-outline-danger" v-on:click="logout()">Abmelden</button>
</template>

<script>
import auth from "../services/AuthService.js";

export default {
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
