<template>
  <b-container class="login-form">
    <b-row class="justify-content-center mt-5">
      <b-col md="4" sm="6" cols="8">
        <div class="panel">
          <h2>Testtest</h2>
          <p>Bitte melden Sie sich mit Ihrem foxdox Konto an:</p>
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col md="4" sm="6" cols="8">
        <div @keyup.enter="sendPassword()">
          <div class="form-group">
            <input v-model="username" class="form-control" placeholder="foxdox-Benutzername">
          </div>
          <div class="form-group">
            <input v-model="password" type="password" class="form-control" placeholder="Passwort">
          </div>
          <div class="description">
            <b-alert
              :show="showAlert"
              @dismissed="showAlert = false"
              variant="danger"
              dismissible
            >{{ errorMsg }}</b-alert>
            <router-link class="description" to="/login/provider">
              <p>Zum Provider-Login</p>
            </router-link>
          </div>
          <button type="button" v-on:click="sendPassword()" class="btn btn-primary">Anmelden</button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import auth from "../services/AuthService.js";

export default {
  data: function() {
    return {
      username: "",
      password: "",
      errorMsg: "Login Fehler: ",
      showAlert: false,
      noError: true
    };
  },
  methods: {
    sendPassword: function() {
      auth.login(this.username, this.password, this);
    }
  },
  mounted() {
    console.log("Login Component mounted.");
  }
};
</script>

<style>
</style>
