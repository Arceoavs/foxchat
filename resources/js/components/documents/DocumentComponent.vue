<template>
  <div class="mt-2">
    <router-link to="/communication">
      <b-card class="textColor">
        {{title}}
        <div class="cardIcon textFox">
          <font-awesome-icon icon="file" size="2x"/>
        </div>
      </b-card>
    </router-link>
  </div>
</template>

 <script>
export default {
  props: ["title"]
};
</script>
 
 <style>
</style>
