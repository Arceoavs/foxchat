<template>
  <b-nav-item right class="logout-link" v-on:click="logout()">
    <a class="foxcolor">{{logoutText}}</a>
  </b-nav-item>
</template>

<script>
import auth from "../../services/AuthService.js";

export default {
  data() {
    return {
      logoutText: "Abmelden"
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
