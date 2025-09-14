<script setup>
import { ref } from 'vue'

const links = [
  ['mdi-inbox-arrow-down', 'Inbox'],
  ['mdi-send', 'Send'],
  ['mdi-delete', 'Trash'],
  ['mdi-alert-octagon', 'Spam'],
]

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
  }),
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
        <v-list-item v-for="[icon, text] in links" :key="icon" :prepend-icon="icon" :title="text" link></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg" elevation="2">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="8">
            <v-sheet min-height="70vh" rounded="lg" elevation="2" class="overflow-y-auto">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>