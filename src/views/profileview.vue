<script setup>
import { ref } from 'vue'

// Controls the visibility of the navigation drawer
const drawer = ref(true) // Keep it open by default

// Controls which content container is visible
const activeContent = ref('content1')

// Define the navigation links. Format: [icon, text, identifier]
const links = [
  ['mdi-account-box-outline', 'Profile', 'content1'],
  ['mdi-cogs', 'Settings', 'content2'],
]

// Function to change the active content
function showContent(identifier) {
  activeContent.value = identifier
}
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
        <div>john@google.com</div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="[icon, text, identifier] in links" :key="icon" :prepend-icon="icon" :title="text"
          :active="identifier === activeContent" @click="showContent(identifier)" link></v-list-item>
      </v-list>
    </v-navigation-drawer> 
    <v-main class="overflow-auto" style="max-height: 100vh;">
      <!-- Container 1 -->
      <v-container v-if="activeContent === 'content1'">
        <v-row>
          <v-col cols="12" md="12">
            <v-sheet min-height="268" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet min-height="70vh" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="9">
            <v-sheet min-height="70vh" rounded="lg" elevation="2" class="overflow-y-auto">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- Container 2 -->
      <v-container v-if="activeContent === 'content2'">
        <v-row>
          <v-col cols="12" md="9">
            <v-sheet min-height="1000" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet min-height="268" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="12">
            <v-sheet min-height="70vh" rounded="lg" elevation="2" class="overflow-y-auto">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<style scoped>
/* Any specific styles for this component can go here */
</style>
