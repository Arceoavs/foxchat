<template>
  <!-- <span class="foxcolor " v-text="$ml.get('abmelden')"/> -->
  <button class="btn logout-btn" v-text="$ml.get('abmelden')" v-on:click="logout()"/>
</template>

<script>
import EventBus from "../../services/event-bus.js";
import auth from "../../services/AuthService.js";
import authProvider from "../../services/AuthServiceProvider.js";

export default {
  data() {
    return {};
  },
  methods: {
    logout(){
      if(this.$store.state.user.isProvider){
        authProvider.logout(this);
      }else{
        auth.logout(this);
      }
    },
    logoutLegacy() {
      EventBus.$emit("loading");
      var path = "/api/auth/user";
      var formData = new FormData();
      formData.append(
        "Authorization",
        "Bearer " + localStorage.getItem("bearer")
      );

      var configExt = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("bearer")
        }
      };

      axios
        .post(path + "/logout", formData, configExt)
        .then(response => {
          console.log("Logged Out.");
        })
        .catch(error => {
          console.log("Error logging Out.");
        })
        .finally(param => {
          this.removeUserServicesAndData();
          this.$router.push("/login");
          EventBus.$emit("loaded");
        });
    },
    removeUserServicesAndData() {
      this.unsubscribeFromChannel();
      localStorage.removeItem("bearer");
      localStorage.removeItem("user");
      this.$store.dispatch("resetUserInbox");
      this.$store.dispatch("resetUser");
      this.$store.dispatch("resetRootFolder");
      this.$store.dispatch("resetRecentFolders");
      this.$store.dispatch("resetRecentDocuments");
      this.$store.dispatch("resetMessageList");
      this.$store.dispatch("resetToastUrl");
      this.$store.dispatch("resetCommunicationUrl");
    },
    removeProviderServicesAndData() {
        this.unsubscribeFromChannel();
        localStorage.removeItem('bearer');
        localStorage.removeItem('user');
        store.dispatch('resetProviderInbox');
        store.dispatch('resetUser');
        store.dispatch('resetMessageList');
        store.dispatch('resetSubscriberList');
        store.dispatch('resetCommunicationUrl');
    },
    unsubscribeFromChannel() {
      if (window.Echo) {
        window.Echo.leave("chat." + this.$store.state.user.name);
        delete window.Echo;
      }
    }
  },
  mounted() {
    console.log("Login Component mounted.");
  }
};
</script>

<style>
.logout-btn {
  background: #f86a2d;
  border-color: #f86a2d;
  color: white !important;
  width: 120px;
  font-size: 100%;
  line-height: 250%;
  padding: 0px;
}
@media (max-width: 767px) {
  .logout-btn {
    background: #f86a2d;
    border-color: #f86a2d;
    color: white !important;
    width: 100%;
    font-size: 100%;
    line-height: 250%;
    padding: 0px;
  }
}
</style>
