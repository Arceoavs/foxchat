<template>
  <!-- Footer -->
  <footer class="footer">
    <b-container fluid>
      <b-row class ="vertical-align">
        <b-col class="text-left">
          <span v-text="$ml.get('footer_message_left')"/>
        </b-col>

        <b-col class="text-center">
          <b-dropdown id="ddown1" v-bind:text="$ml.get('sprache')" class="m-md-2">
            <b-dropdown-header v-text="$ml.get('sprache_waehlen')"></b-dropdown-header>
            <b-dropdown-item
              v-for="lang in $ml.list"
              :key="lang"
              @click="$ml.change(lang)"
              v-text="lang"
            ></b-dropdown-item>
          </b-dropdown>
        </b-col>

        <b-col class="text-right">
          <a
            href="https://www.d-velop.de/foxdox/foxdox-home"
            v-text="$ml.get('footer_message_right')"
          />
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
</script>

<style>
.footer {
  position: sticky;
  width: 100%;
  font-size: 0.8rem;
  background: rgb(255, 255, 255);
  /* z-index: 100; */
  color: rgb(0, 0, 0);
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: rgb(255, 255, 255) !important;
  color: rgb(0, 0, 0) !important;
}

.vertical-align {
    display: flex;
    align-items: center;
}
</style>
