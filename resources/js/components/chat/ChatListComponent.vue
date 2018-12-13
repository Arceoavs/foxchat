<template>
  <div class="mt-2">
    <router-link :to="'/communication/'+provider+'/'+title">
      <b-card class="textColor">
        <b-row>
          <b-col cols="1">
            <div class="chatIcons textFox" >
              <font-awesome-icon icon="file" size="2x"/>
            </div>
          </b-col>
          <b-col cols="2">
            <p class="font-weight-bold">{{title}}</p>
          </b-col>
          <b-col cols="7">
            <p class="font-weight-light text-left">{{message}}</p>
          </b-col>
          <b-col cols="2">
            <p class="font-weight-light text-right">{{cuttedDate}} {{cuttedTime}}</p>
          </b-col>
        </b-row>
      </b-card>
    </router-link>
  </div>
</template>

 <script>
export default {
  props: ["title", "provider","message", "date"],
  // ,data() {
  //   return {
  //     titel : "Hallo"
  //   };
  // }
  computed: {
    cuttedTime() {
      return this.date.slice(11, 16);
    },
    cuttedDate(){
      return (this.date.slice(8, 10)+"."+this.date.slice(5, 7)+".");
    }
  }
};
</script>
 
 <style>
.chatIcons {
  float: left;
}
</style>
