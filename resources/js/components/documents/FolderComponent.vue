<template>
  <b-jumbotron bg-variant="secondary" class="folderGroup">
    <!-- Folder name -->
    <b-card
      @click="goTo()">
    <div class="box">{{name}}
    </div>
    </b-card>
  </b-jumbotron>
</template>

<script>

export default {
  props: ["name"],
  data() {
    return {
        showCollapse: false
    };
  },
  methods: {
     goTo() {
       alert("Hi");
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
  color:#f86a2d !important;
}
</style>
