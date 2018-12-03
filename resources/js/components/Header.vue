<template>
  <b-navbar toggleable="md" class="navbar-laravel">
    <b-navbar-brand to="/">
      <img class="img-logo" src="/img/FoxdoxChat.png">
    </b-navbar-brand>
    <b-navbar-nav v-show="loggedIn">
      <b-nav-item to="/index">
        <div>Dokumente</div>
      </b-nav-item>
      <b-nav-item to="/Chat">
        <div>Chat</div>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto foxcolor max-height-nav" v-show="loggedIn">
      <b-nav-item right class="logout-link">
        <logout-component></logout-component>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
</script>

<style>
</style>
