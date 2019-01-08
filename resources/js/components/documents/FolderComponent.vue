<template>
  <b-jumbotron bg-variant="secondary" class="folderGroup">
    <!-- Folder name -->
    <router-link :to="{path: '/dokumente/provider/' + name}" class="box">
      <b-card>
        <div class="box">{{name}}
        </div>
      </b-card>
    </router-link>
  </b-jumbotron>
</template>

<script>

export default {
  props: ["name"],
  methods: {
     openFolder() {
       alert(this.$ml.get('ordner') + this.name + this.$ml.get('wird_geoeffnet'));
     }
  },
};
</script>

<style>
.folderGroup {
  padding: 0.1em;
  margin: 0.1em;
  background-color: rgba(241, 241, 241, 0.1) !important;
  cursor: pointer;
}
.box{
  color:rgba(108, 117, 125, 1) !important;
  text-decoration: none !important;
}
.box:hover{
  color:#f86a2d !important;
  cursor: pointer;
}
</style>
