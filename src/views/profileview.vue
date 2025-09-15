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
  <v-app >
    <div class="position-absolute start-0 h-100">
      <v-navigation-drawer v-model="drawer" elevation="3" class="position-sticky">
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
    </div>
    <v-main class="overflow-auto main-content" style="max-height: 100vh;">
      <!-- Container 1 -->
      <v-container v-if="activeContent === 'content1'" class="content1">
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

.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
}

.div1 {
  grid-row: span 4 / span 4;
}

.div2 {
  grid-column: span 4 / span 4;
  grid-row: span 4 / span 4;
}

.div3 {
  grid-column: span 5 / span 5;
  grid-row-start: 5;
}

.main-content {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</style>
