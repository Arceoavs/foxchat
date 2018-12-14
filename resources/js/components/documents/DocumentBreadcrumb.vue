<template>
<div class="document-breadcrumb">{{current}}</div>
</template>

<script>
export default {
  data() {
    current:"Test"
    return {
      items: [
        {
          text: "test",
          active: true,
        }
      ]
    };
  }
};
</script>

<style>
.document-breadcrumb {
  color:#f86a2d !important;
}
</style>
