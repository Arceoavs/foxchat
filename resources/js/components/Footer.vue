<template>
  <!-- Footer -->
  <mdb-footer color="blue" class="font-small pt-4 mt-4">
    <mdb-container class="text-left">
      <mdb-row>
        <mdb-col sm="6">
          <!-- Hier ist platz für einen Titel h5 zB-->
          <p v-text="$ml.get('footer_message_left')"/>
        </mdb-col>
        <mdb-col sm="6">
          <h5 class="title"></h5>
          <ul>
            <li class="list-unstyled">
              <a
                class="footer-text"
                href="https://www.d-velop.de/foxdox/foxdox-home"
                v-text="$ml.get('footer_message_right')"
              />
            </li>

            <li class="list-unstyled">
              <a href="#!">Impressum</a>
            </li>
          </ul>

          <p v-for="lang in $ml.list" :key="lang" @click="$ml.change(lang)" v-text="lang"/>

        </mdb-col>
      </mdb-row>
    </mdb-container>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid>
        &copy; 2018 Copyright:
        <a
          class="footer-text"
          href="https://www.d-velop.de/foxdox/foxdox-home"
          v-text="$ml.get('footer_message_right')"
        />
      </mdb-container>
    </div>
  </mdb-footer>
  <!-- Footer -->
  <!-- 
  <footer class="font-small pt-4 mt-4 footer">
    <b-container fluid>
      <b-row class="mt-5">
        <b-col>
          <div class="footer-text footer-left">
            <p v-text="$ml.get('footer_message_left')"/>
          </div>

          <b-row>
          <<div class="footer-text footer-left"> 
            <a
              class="footer-text"
              href="https://www.d-velop.de/foxdox/foxdox-home"
              v-text="$ml.get('footer_message_right')"
            />
          <! </div> 
          </b-row>

          <div>
            <button v-for="lang in $ml.list" :key="lang" @click="$ml.change(lang)" v-text="lang"/>
          </div>

        </b-col>
      </b-row>
    </b-container>
  </footer>-->
</template>

<script>
export default {
  data() {
    return {
      //footerMessageLeft: "Projektseminar: Der digitale Tresor",
      //footerMesageRight: "powered by foxdox"
    };
  }
};
</script>

<style>
/* 
.footer-text {
  color: #000000;
  font-size: 10pt;
  vertical-align: middle;
  /*margin-top: -65px;
}

.footer-left {
  float: center; /* was  
  padding-left: 10px;
}

.footer-right {
  float: center; /* was right
  padding-right: 10px;
}

.footer {
  height: 170px;
  width: 100%;
  background: rgb(255, 255, 255);
  position: fixed;
  bottom: 0;
  z-index: 100;
  color: rgb(255, 255, 255);
  text-align: central; /* was central before 
  font-size: 10pt;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
} */
</style>
