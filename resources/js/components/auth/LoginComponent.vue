<template>
  <b-container class="login-form">
    <b-row class="justify-content-center mt-5">
      <b-col md="4" sm="6" cols="8">
        <div class="panel">
          <!--getting multilanguage strings, value will be determined by reading language property in ml module-->
          <h2 v-text="$ml.get('anmeldung')" />
          <p v-text="$ml.get('login_text')" />
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col md="4" sm="6" cols="8">
        <div @keyup.enter="sendPassword()">
          <div class="form-group">
            <!--input field for username-->
            <input v-model="username" class="form-control" v-bind:placeholder="$ml.get('fox_username')">
          </div>
          <div class="form-group">
            <!--input field for password-->
            <input v-model="password" type="password" class="form-control" v-bind:placeholder="$ml.get('password')">
          </div>
          <div class="description">
            <!--displaying error messages if property is set-->
            <b-alert
              :show="showAlert"
              @dismissed="showAlert = false"
              variant="danger"
              dismissible
            >{{ errorMsg }}</b-alert>
            <!--link to provider login component-->
            <router-link class="description" to="/login/provider">
              <p v-text="$ml.get('provider_login')" />
            </router-link>
          </div>
          <!--calling login method see javascript section for more documentation-->
          <button type="button" v-on:click="sendPassword()" class="btn btn-primary"><p v-text="$ml.get('login_button')"/></button>
        </div>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
import auth from "../../services/AuthService.js";

export default {
  //defining properties of component
  data: function() {
    return {
      username: "",
      password: "",
      errorMsg: "Anmeldung fehlgeschlagen: ",
      showAlert: false,
      noError: true
    };
  },
  methods: {
    //calling login method from AuthService for regular Users
    sendPassword: function() {
      auth.login(this.username, this.password, this);
    }
  },
  //logging
  mounted() {
    console.log("Login Component mounted.");
  }
};
</script>

<style>
</style>
