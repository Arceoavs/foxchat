<template>
  <b-container class="login-form">
    <b-row class="justify-content-center mt-5">
      <b-col md="4" sm="6" cols="8">
        <div class="panel"> 
          <!--getting multilanguage strings, value will be determined by reading language property in ml module-->
          <h2 v-text="$ml.get('anmeldung')"/>
          <p v-text="$ml.get('login_text')"/>
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col md="4" sm="6" cols="8">
        <div @keyup.enter="sendPassword()">
          <div class="form-group">
            <!--input field for username-->
            <input
              v-model="username"
              class="form-control"
              v-bind:placeholder="$ml.get('benutzername')"
            >
          </div>
          <!--input field for password-->
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              v-bind:placeholder="$ml.get('password')"
            >
          </div>
          <!--input field for x-provider id-->
          <div class="form-group">
            <input v-model="xProvider" class="form-control" placeholder="X-Provider ID">
          </div>
          
          <div class="description">
             <!--displaying error messages if property is set-->
            <b-alert
              :show="showAlert"
              @dismissed="showAlert = false"
              variant="danger"
              dismissible
            >{{ errorMsg }}</b-alert>
            <!--link to user login component-->
            <router-link class="description" to="/login">
              <p v-text="$ml.get('user_login')"/>
            </router-link>
          </div>
          <button type="button" v-on:click="sendPassword()" class="btn btn-primary">
            <!--calling login method see javascript section for more documentation-->
            <p v-text="$ml.get('login_button')"/>
          </button>
        </div>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
import auth from "../../services/AuthServiceProvider.js";

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
    console.log("Login Provider Component mounted.");
  }
};
</script>
