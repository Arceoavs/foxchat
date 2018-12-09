<template>
  <router-link to="/communication">
    <b-card class="textColor">
      {{title}}
      <div class="cardIcon textFox">
        <font-awesome-icon icon="file" size="2x"/>
      </div>
    </b-card>
  </router-link>
</template>

 <script>
export default {
  props: ["title"]
  // ,data() {
  //   return {
  //     titel : "Hallo"
  //   };
  // }
};
</script>
 
 <style>
</style>
