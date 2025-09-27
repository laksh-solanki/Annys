<template>
  <v-footer elevation="2" color="white" app absolute inset>
    <v-col class="text-center" cols="12">
      &copy; {{ new Date().getFullYear() }} <p class="footer-text"> Annys</p> . All rights reserved.
    </v-col>
  </v-footer>
</template>

<script setup></script>

<style scoped>
.footer-text {
  display: inline-block;
  font-family: "Oooh Baby", cursive;
  font-size: x-large;
  font-weight: 999;
  color: red;
  text-decoration: none;
  text-underline-offset: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0%;
  padding: 0%;
}
</style>
