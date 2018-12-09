<template>
  <router-link to="/communication">
    <b-card class="textColor">
      {{documentChat}}
      <div class="cardIcon textFox">
        <font-awesome-icon icon="file" size="2x"/>
      </div>
    </b-card>
  </router-link>
</template>

 <script>
export default {
  props: ["documentChat"],
  data() {
    return {
      documentChat: "Chat zu Doument"
    };
  }
};
</script>
 
 <style>
</style>
