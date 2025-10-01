<script setup>
import { ref, computed, watch, onMounted } from 'vue'
const drawer = ref(true)
const activeContent = ref('content1')
const links = [
  ['mdi-account-box-outline', 'Profile', 'content1'],
  ['mdi-cogs', 'Settings', 'content2'],
  ['mdi-account-key', 'Student Key', 'content3'],
]
function showContent(identifier) {
  activeContent.value = identifier
}

const id = ref('')
const password = ref('')
const showCard = ref(false)
const showError = ref(false)
let recaptchaPromise = null

const fixedId = 'Lucky2912'
const fixedPassword = 'Lucky.2912'

function loadRecaptcha() {
  if (!recaptchaPromise) {
    recaptchaPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src =
        'https://www.google.com/recaptcha/api.js?render=6LfaC9grAAAAACKD6OqS8ZTY2YMxl3TNrSS0Mswc'
      script.async = true
      script.defer = true
      script.onload = () => {
        grecaptcha.ready(resolve)
      }
      script.onerror = (error) => {
        reject(error)
      }
      document.head.appendChild(script)
    })
  }
  return recaptchaPromise
}

watch(activeContent, (newValue) => {
  if (newValue === 'content3') {
    loadRecaptcha().catch((error) => console.error('reCAPTCHA script failed to load:', error))
  }
})

function checkCredentials() {
  loadRecaptcha()
    .then(() => {
      grecaptcha
        .execute('6LfaC9grAAAAACKD6OqS8ZTY2YMxl3TNrSS0Mswc', { action: 'login' })
        .then(function (token) {
          // IMPORTANT: You need to send this token to your backend for verification.
          console.log('reCAPTCHA token:', token)

          if (id.value === fixedId && password.value === fixedPassword) {
            showCard.value = true
            showError.value = false
          } else {
            showError.value = true
          }
        })
    })
    .catch((error) => console.error('reCAPTCHA execution failed:', error))
}

const search = ref('')
const rowRefs = ref([])

watch(search, async (newValue) => {
  if (newValue) {
    await nextTick()
    const highlightedRow = rowRefs.value[parseInt(newValue) - 1]
    if (highlightedRow) {
      highlightedRow.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
})
</script>

<template>
  <v-layout ref="app">
    <v-navigation-drawer v-model="drawer" elevation="2">
      <v-sheet class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="70"><img
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
            alt="" class="object-fit-cover w-100" /></v-avatar>
        <div>Laksh Solanki</div>
        <v-btn icon class="mobile-toggle-btn" @click="drawer = !drawer"
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
    <v-main class="overflow-auto main-content" style="max-height: 100vh">
      <!-- Container 1 -->
      <v-container v-if="activeContent === 'content1'" class="content1">
        <v-row>
          <v-col cols="12" md="12">
            <v-sheet min-height="268" rounded="lg" elevation="3" class="bg-style-1">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet min-height="70vh" rounded="lg" elevation="3" class="bg-style-1">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="9">
            <v-sheet min-height="70vh" rounded="lg" elevation="3" class="bg-style-1">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- Container 2 -->
      <v-container v-if="activeContent === 'content2'">
        <v-row>
          <v-col cols="12" md="9">
            <v-sheet min-height="268" rounded="lg" elevation="3" class="bg-style-1">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet min-height="268" rounded="lg" elevation="3" class="bg-style-1">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="12">
            <v-sheet min-height="70vh" rounded="lg" elevation="3" class="bg-style-1">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <!-- Container 3 -->
      <v-container v-if="activeContent === 'content3'">
        <v-row>
          <v-col cols="12" md="12" style="height: 91.4vh;">
            <v-card v-if="!showCard" class="pa-5 z-0">
              <v-card-title class="text-h5 text-center">Enter Credentials</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="checkCredentials">
                  <v-text-field v-model="id" label="ID" variant="outlined"></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password" variant="outlined"></v-text-field>
                  <v-btn type="submit" color="primary">Submit</v-btn>
                  <v-alert v-if="showError" type="error" class="mt-3">Invalid ID or password</v-alert>
                </v-form>
              </v-card-text>
            </v-card>
            <v-container v-if="showCard" class="pa-5">
              <v-card class="mx-auto z-0" max-width="1100">
                <v-card-title class="d-flex align-center pe-2">
                  <v-icon>mdi-account</v-icon>
                  <span class="ms-1">Student Submited List</span>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="solo-filled" flat hide-details single-line></v-text-field>
                </v-card-title>
                <v-card-text class="bg-surface-light pt-4">
                  <v-table theme="dark" height="500px" fixed-header>
                    <thead>
                      <tr>
                        <th class="text-left">Roll No.</th>
                        <th class="text-left">Submittion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in 48" :key="i" :ref="(el) => {
                        if (el) rowRefs[i - 1] = el
                      }
                        " :class="{ highlight: search && i === parseInt(search) }">
                        <td>{{ i }}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
.main-content {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.bg-style-1 {
  width: 100%;
  height: 100%;
  --color: #e1e1e1;
  background-color: #f3f3f3;
  background-image:
    linear-gradient(0deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent),
    linear-gradient(90deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent);
  background-size: 55px 55px;
}

.bg-style-2 {
  width: 100%;
  height: 100%;
  --color: rgba(114, 114, 114, 0.3);
  background-color: #191a1a;
  background-image:
    linear-gradient(0deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent),
    linear-gradient(90deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent);
  background-size: 55px 55px;
}

.mobile-toggle-btn {
  display: none;
}

@media (max-width: 960px) {

  /* Show button on small and extra small screens */
  .mobile-toggle-btn {
    display: inline-flex !important;
    position: fixed;
    border: 1px solid #ccc; 
    top: 35px;
    right: -26px;
  }
}

.highlight {
  background-color: rgb(255, 255, 120);
  color: black;
}
</style>
