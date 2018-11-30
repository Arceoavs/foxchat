<template>
  <!--<div class="container myCont">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div @keyup.enter="sendPassword()" class="card-body mx-auto">
                        <input v-model="username" placeholder="Username">
                        <input type="password" v-model="password" placeholder="Password">
                        <button type="button" class="btn foxcolor" v-on:click="sendPassword()" >Login</button>

                        <b-alert :show="showAlert" @dismissed="showAlert = false" variant="danger" dismissible>{{ errorMsg }}</b-alert>
                        
                        <p><router-link to="/login/provider">
                            <a class="">No User? Get to our Provider Form</a>
                        </router-link></p>
                    </div>
                </div>
            </div>
        </div>
  </div>-->
  <div class="login-form">
    <div class="main-div">
      <div class="panel">
        <h2>Anmeldung</h2>
        <p>Melden sie sich mit ihrem foxdox Konto an:</p>
      </div>
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
</template>

<script>
import auth from "../services/AuthService.js";

export default {
  data: function() {
    return {
      username: '',
      password: '',
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





