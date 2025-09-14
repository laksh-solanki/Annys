<template>
  <v-app style="background-color: #f5f5f5;">
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

</script>

<style>
/* Global styles */
#app {
  font-family: 'Roboto', sans-serif;
}
</style>
