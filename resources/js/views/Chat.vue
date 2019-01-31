<template>
  <!-- Shows everything chat-related under the /chat view (/provider-chat if logged in as provider) -->
  <div>
    <!-- Can display either chat overview or chat window -->
    <router-view/>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   console.log("Nested Component mounted.");
  // }
};
</script>
