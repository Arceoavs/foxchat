<template>
<div class="breadcrumb-link">
  <b-breadcrumb :items="items"/>
</div>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        text: 'Admin',
        href: '#'
      }, {
        text: 'Manage',
        href: '#'
      }, {
        text: 'Library',
        active: true
      }]
    }
  }
}
</script>

<style>

.breadcrumb-link{
    color: #f86a2d;
}
</style>
