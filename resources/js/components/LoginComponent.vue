<template>
  <div class="login-form">
    <div class="row justify-content-center">
      <div class="col-4 col-md-4 col-sm-8">
        <div class="panel">
          <h2>Anmeldung</h2>
          <p>Bitte melden Sie sich mit Ihrem foxdox Konto an:</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 col-md-4 col-sm-6 ">
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
      </div>
    </div>
  </div>
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
.panel h2 {
  padding-top: 30px;
  color: #444444;
  font-size: 40px;
  text-align: center;
}
.panel p {
  color: #777777;
  font-size: 14px;
  margin-bottom: 30px;
  line-height: 24px;
}
.login-form .form-control {
  border: 1px solid #f86a2d;
  border-radius: 4px;
  font-size: 14px;
  height: 50px;
}
.login-form {
  text-align: center;
}
.login-form .btn.btn-primary {
  background: #f86a2d;
  border-color: #f86a2d;
  font-size: 14px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0px;
}
.description {
  color: #777777;
  text-align: left;
  font-size: 18px;
  margin-bottom: 30px;
}
</style>
