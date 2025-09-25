<script setup>
import { ref } from 'vue'
const drawer = ref(true)
const activeContent = ref('content1')
const links = [
  ['mdi-account-box-outline', 'Profile', 'content1'],
  ['mdi-cogs', 'Settings', 'content2'],
]
function showContent(identifier) {
  activeContent.value = identifier
}
</script>

<template>
  <v-app>
    <div class="position-sticky h-100" style="top: 0;">
      <v-navigation-drawer v-model="drawer" elevation="2" class="position-fixed">
        <v-sheet class="pa-4" style="margin-top: 60px;" color="grey-lighten-4">
          <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
          <div>john@google.com</div>
          <v-btn icon class="mobile-toggle-btn mt-2" @click="drawer = !drawer"
            :aria-label="drawer ? 'Close navigation drawer' : 'Open navigation drawer'">
            <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
          </v-btn>
        </v-sheet>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="[icon, text, identifier] in links" :key="icon" :prepend-icon="icon" :title="text"
            :active="identifier === activeContent" @click="showContent(identifier)" link>
            <template v-slot:append>
              <v-icon v-if="identifier === activeContent">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-main class="overflow-auto main-content" style="max-height: 100vh;">
      <!-- Container 1 -->
      <v-container v-if="activeContent === 'content1'" class="content1">
        <v-row>
          <v-col cols="12" md="12">
            <v-sheet min-height="268" rounded="lg" elevation="2">
              <v-card image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"></v-card>
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
            <v-sheet min-height="268" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet min-height="268" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="12">
            <v-sheet min-height="70vh" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.main-content {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.mobile-toggle-btn {
  display: none;
}

@media (max-width: 960px) {

  /* Show button on small and extra small screens */
  .mobile-toggle-btn {
    display: inline-flex !important;
    position: fixed;
    top: 55px;
    right: -26px;
  }
}
</style>
