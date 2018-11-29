<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <b-navbar-brand to="/">
        <img class="img-logo" src="/img/FoxdoxChat.png">
      </b-navbar-brand>
      <!--Toggler-->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <b-nav-item to="/">
              <div class="foxcolor-pure">Dokumente</div>
            </b-nav-item>
          </li>
          <b-nav-item to="/Chat">
            <div class="foxcolor-pure">Chat</div>
          </b-nav-item>
        </ul>
        <ul right>
          <logout-component></logout-component>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
    <loading-component></loading-component>
  </div>
</template>

<script>
import LogoutComponent from "./LogoutComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  components: {
    LogoutComponent,
    LoadingComponent
  }
};
</script>
