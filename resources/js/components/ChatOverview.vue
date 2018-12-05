<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <b-card>
          <b-btn v-b-toggle.collapseA.collapseB>Provider 1</b-btn>
          <div class="foxcolor showChatButton">
            <font-awesome-icon icon="angle-right"/>
          </div>
        </b-card>

        <!-- elements to collapse -->
        <b-collapse id="collapseA" class="mt-2">
          <b-card>I am collapsable content A!</b-card>
        </b-collapse>
        <b-collapse id="collapseB" class="mt-2">
          <b-card>I am collapsable content B!</b-card>
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style>
.showChatButton {
    float: right;
    line-height: 3em;
}
</style>
