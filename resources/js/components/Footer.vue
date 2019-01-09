<template>
  <!-- Footer -->
  <footer class="font-small pt-2 mt-2 footer">
    <b-container fluid>
      <b-row>
        <b-col class="text-center">
          <b-dropdown id="ddown1" v-bind:text="$ml.get('sprache')" class="m-md-2">
            <b-dropdown-item
              v-for="lang in $ml.list"
              :key="lang"
              @click="$ml.change(lang)"
              v-text="lang"
            ></b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>

      <b-row class="text-center">
        <b-col>
          <p v-text="$ml.get('footer_message_left')"/>
        </b-col>

        <b-col>
          <a
            href="https://www.d-velop.de/foxdox/foxdox-home"
            v-text="$ml.get('footer_message_right')"
          />
        </b-col>

        <b-col>
          <a href="#!">Impressum</a>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
</script>

<style>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /*height: 50px;*/
  /* width: 100%; */
  background: rgb(255, 255, 255);
  /* position: fixed; */
  /* bottom: 0; */
  /* z-index: 100; */
  color: rgb(0, 0, 0);
  /* text-align: central; */
  /* font-size: 10pt; */
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
