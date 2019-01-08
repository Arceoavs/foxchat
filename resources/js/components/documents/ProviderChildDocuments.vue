<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card>Child</b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  //props: [providerName, folders],
  data() {
    return {
      items: [
        {
          text: "child",
          href: "/dokumente/provider/child"
        }
      ]
    };
  }
};
</script>
