<template>
  <b-col>
    <div class="document-breadcrumb">
      <b-breadcrumb :items="items"/>
    </div>
      <b-list-group>
        <b-list-group-item href=owndocument>Eigene Dokumente</b-list-group-item>
        <b-list-group-item href="/arbeitgeber">Arbeitgeber 1</b-list-group-item>
        <b-list-group-item href="/versicherung1">Versicherung 1</b-list-group-item>
        <b-list-group-item href="/versicherung2">Versicherung 2</b-list-group-item>
        <b-list-group-item href="/inbox">Mein Posteingang</b-list-group-item>
      </b-list-group>
  </b-col>
</template>


<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Root",
          active: true,
        }
      ]
    };
  }
};
</script>
<style>

.document-breadcrumb {
  background-color: #f86a2d;
}

</style>
