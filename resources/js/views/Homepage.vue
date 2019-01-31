<template>
  <div class="home">
    <h1 class="heading" v-text="$ml.get('homepage_sentence')"></h1>
    <img class="welcome" src="/img/FoxdoxChat.png">
    <h3 class="bottom" v-text="$ml.get('homepage_introduction')"></h3>
  </div>
</template>

<script>
</script>

<style>
.home {
  text-align: center;
  margin: auto;
  padding-top: 10%;
  color: rgb(86, 86, 86);
  /* padding-bottom: 50%; */
}
.bottom {
  padding-top: 1%;
}
.welcome {
  width: 50%;
  height: 50%;
}
.heading {
  font-size: 350%;
}
</style>
