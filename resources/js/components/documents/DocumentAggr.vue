<template>
  <div>
      <b-breadcrumb :items="items"/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items: [
        {
          text: "Dokumente",
          to: {name: 'Dokumente'}
        },
        {
          text: "Provider",
          to: {name: 'myproviders'}
        },
        {
          text: "Child",
          to: {name: 'children'}
        }
      ]
    }
  },

  mounted() {
    console.log("Nested Component mounted.");
  }
};
</script>
