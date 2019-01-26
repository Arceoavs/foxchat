<template>
  <b-jumbotron bg-variant="secondary" class="chatGroup">
    <router-link :to="'/Documents'" class="undecorated">
      <b-card class="textColor">
        <b-row>
          <b-col cols="1" sm="2" md="1" class="textFox chatIcon">
            <div class="chatIcons textFox">
              <font-awesome-icon icon="plus-circle" size="2x"/>
            </div>
          </b-col>
          <b-col>
            <p class="font-weight-bold" v-text="$ml.get('add_chat')"/>
          </b-col>
        </b-row>
      </b-card>
    </router-link>
  </b-jumbotron>
</template>

<script>
export default {};
</script>
<style>
.chatGroup {
  background-color: rgba(90, 83, 83, 0.1) !important;
  cursor: pointer;
}
</style>
