<template>
  <div class="mt-2">
    <router-link to="/communication">
      <b-card class="textColor">
        <b-row>
          <b-col cols="1">
            <div class="chatIcons textFox" >
              <font-awesome-icon icon="file" size="2x"/>
            </div>
          </b-col>
          <b-col cols="3">
            <p class="font-weight-bold">{{title}}</p>
          </b-col>
          <b-col cols="7">
            <p class="font-weight-light text-left">{{message}}</p>
          </b-col>
          <b-col cols="1">
            <p class="font-weight-light text-right">{{cuttedDate}}</p>
          </b-col>
        </b-row>
      </b-card>
    </router-link>
  </div>
</template>

 <script>
export default {
  props: ["title", "message", "date"],
  // ,data() {
  //   return {
  //     titel : "Hallo"
  //   };
  // }
  computed: {
    cuttedDate() {
      return this.date.slice(11, 16);
    }
  }
};
</script>
 
 <style>
.chatIcons {
  float: left;
}
</style>
