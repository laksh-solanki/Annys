<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <v-app style="background-color: #f5f5f5">
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
  font-family: 'Roboto', sans-serif;
}
</style>
