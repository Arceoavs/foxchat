<template>

  <footer class="font-small pt-4 mt-4 footer" >
    <b-container fluid>
      <b-row class="mt-5">
        <b-col>

          <div class="footer-text footer-left">
            <p>{{footerMessageLeft}}</p>
          </div>

          <div class="footer-text footer-right">
            <a class="footer-text"
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
      footerMesageRight: "powered by foxdox"
    };
  }
};
</script>

<style>
.footer-text {
  color: #000000;
  font-size: 10pt;
  vertical-align: middle;
  margin-top: -65px;
}

.footer-left {
  float: left;
  padding-left: 10px;
}

.footer-right {
  float: right;
  padding-right: 10px;
}

.footer {
    height: 30px;
    width: 100%;
    background: rgb(255, 255, 255);
    position: fixed;
    bottom: 0;
    z-index: 100;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 10pt;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
}

</style>
