<template>
  <div class="login-form">
    <div class="main-div">
      <div class="panel">
        <h2>Anmeldung</h2>
        <p>Melden sie sich mit ihrem foxdox Konto an:</p>
      </div>
      <div @keyup.enter="sendPassword()">
        <div class="form-group">
          <input v-model="username" class="form-control" placeholder="Benutzername">
        </div>

        <div class="form-group">
          <input v-model="password" type="password" class="form-control" placeholder="Passwort">
        </div>

        <div class="form-group">
          <input v-model="xProvider" class="form-control" placeholder="X-Provider ID">
        </div>
        <div class="description">
          <b-alert
            :show="showAlert"
            @dismissed="showAlert = false"
            variant="danger"
            dismissible
          >{{ errorMsg }}</b-alert>

          <router-link class="description" to="/login">
            <p>Zum Benutzer-Login</p>
          </router-link>
        </div>
        <button type="button" v-on:click="sendPassword()" class="btn btn-primary">Anmelden</button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../services/AuthService.js";

export default {
  data: function() {
    return {
      username: "mein.arbeitgeber",
      password: "mein.arbeitgeber",
      xProvider: "cSwKpDdwpCgVBYWfSkJY",
      errorMsg: "Login Fehler: ",
      showAlert: false,
      noError: true
    };
  },
  methods: {
    sendPassword: function() {
      auth.login(this.username, this.password, this.xProvider, this);
    }
  },
  mounted() {
    console.log("Login Component mounted.");
  }
};
</script>
