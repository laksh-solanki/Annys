<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <v-app theme="dark" id="app">
    <Navbar />
    <v-main>
      <router-view />
      <SpeedInsights />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
#app {
  box-sizing: border-box;
  padding: 0%;
  margin: 0%;
  width: 100%;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}
</style>
