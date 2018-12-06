<template>
  <footer class="font-small pt-4 mt-4">
    <b-container fluid>
      <b-row class="mt-5">
        <b-col>
          <div class="footer-text footer-left">
            <p>{{footerMessageLeft}}</p>
          </div>
          <div class="footer-right">
            <a
              class="footer-text"
              href="https://www.d-velop.de/foxdox/foxdox-home"
            >{{footerMesageRight}}</a>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footerMessageLeft: "Projektseminar: Der digitale Tresor",
      footerMesageRight: "powered by foxfox"
    };
  }
};
</script>

<style>
.page-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #fff !important;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
}
.footer-text {
  color: #777777;
  font-size: 14px;
  vertical-align: middle;
}
.footer-left {
  float: left;
  padding-left: 10px;
}
.footer-right {
  float: right;
  padding-right: 10px;
}
</style>
