<template>
  <div class="container myCont">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card card-default">
          <div class="card-header">Login</div>
          <div @keyup.enter="sendPassword()" class="card-body mx-auto">
            <input v-model="username" placeholder="Username">
            <input type="password" v-model="password" placeholder="Password">
            <button type="button" class="btn foxcolor" v-on:click="sendPassword()">Login</button>

            <b-alert
              :show="showAlert"
              @dismissed="showAlert = false"
              variant="danger"
              dismissible
            >{{ errorMsg }}</b-alert>

            <p>
              <router-link to="/provider/login">
                <a class>No User? Get to our Provider Form</a>
              </router-link>
            </p>
          </div>
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
      //username: "manuel.barkau",
      //password: "011235813",
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
