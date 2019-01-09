<template>
  <!-- Footer -->
  <footer class="font-small pt-4 mt-4 footer">
    <b-container class="text-left">
      <b-row>
        
<b-container class="bv-example-row">
    <b-row>
        <b-col> <p v-text="$ml.get('footer_message_left')"/></b-col>
        <b-col><a
                href="https://www.d-velop.de/foxdox/foxdox-home"
                v-text="$ml.get('footer_message_right')"
              /></b-col>
        <b-col><a href="#!">Impressum</a></b-col>
    </b-row>
</b-container>

          <!-- Text Projektseminar: ... -->
        <b-col sm="6">
          <p v-text="$ml.get('footer_message_left')"/>
        </b-col>
        <b-col sm="6">

            <ul>
              <!-- Text powered by foxdox -->
            <li class="list-unstyled">
              <a
                href="https://www.d-velop.de/foxdox/foxdox-home"
                v-text="$ml.get('footer_message_right')"
              />
            </li>

          <!-- Platzhalter für ein Impressum -->
            <li class="list-unstyled">
              <a href="#!">Impressum</a>
            </li>
          

          <!-- Switch für Sprachen -->
          <p v-for="lang in $ml.list" :key="lang" @click="$ml.change(lang)" v-text="lang"/>

          </ul>

        </b-col>
      </b-row>
    </b-container>
<!-- Copyright-Text Bereich -->
    
    <div class="footer-copyright text-center py-3">
      <b-container fluid>
        &copy; 2018 Copyright:
        <a
          href="https://www.d-velop.de/foxdox/foxdox-home"
        > foxdox </a>
      </b-container>

    </div>
  </footer>
</template>

<script>

</script>

<style>

.footer {
  /*height: 50px;*/ 
  width: 100%;
  background: rgb(255, 255, 255);
  /* position: fixed; */
  /* bottom: 0; */
  /* z-index: 100; */
  color: rgb(0, 0, 0);
  text-align: central;
  /* font-size: 10pt; */
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
} 

</style>
