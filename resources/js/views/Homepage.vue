<template>
  <!-- The landing page to be displayed after successful login under the /homepage route-->
  <div>
    <h1 v-text="$ml.get('homepage_sentence')"></h1>
    <h3 v-text="$ml.get('homepage_introduction')"></h3>
  </div>
</template>
