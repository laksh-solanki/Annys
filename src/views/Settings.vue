<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
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

const submissions = ref(
  JSON.parse(localStorage.getItem('studentSubmissions')) ||
    Array(48)
      .fill()
      .map(() => ({ status: 'undefined' })),
)

watch(
  submissions,
  (newSubmissions) => {
    localStorage.setItem('studentSubmissions', JSON.stringify(newSubmissions))
  },
  { deep: true },
)

function updateSubmission(index, newStatus) {
  submissions.value[index].status = newStatus
}

function editSubmission(index) {
  submissions.value[index].status = 'undefined'
}

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
  <v-layout ref="app" class="fill-height z-0">
    <v-navigation-drawer
      v-model="drawer"
      class="border-secondary border-end container-animate"
      elevation="2"
      app
    >
      <v-sheet class="pa-4 border-bottom border-black">
        <v-avatar class="mb-4" color="grey-darken-1" size="70"
          ><img
            src="../assets/profile-pic.webp"
            alt=""
            class="rounded-5 object-fit-cover"
            width="60"
        /></v-avatar>
        <v-card-title class="p-0">Laksh Solanki</v-card-title>
        <v-card-subtitle class="p-0">lakshsolanki848@gmail.com</v-card-subtitle>
        <v-btn
          icon
          class="mobile-toggle-btn"
          @click="drawer = !drawer"
          :aria-label="drawer ? 'Close navigation drawer' : 'Open navigation drawer'"
        >
          <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </v-sheet>
      <v-list>
        <v-list-item
          v-for="[icon, text, identifier] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :active="identifier === activeContent"
          @click="showContent(identifier)"
          link
        >
          <template v-slot:append>
            <v-icon v-if="identifier === activeContent">mdi-chevron-right</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="main-content overflow-hidden">
      <!-- Container 1 -->
      <v-container v-if="activeContent === 'content1'" class="content1">
        <v-row>
          <v-col cols="12" md="12">
            <v-sheet
              rounded="lg"
              elevation="3"
              class="pa-3 bg-style-1 rounded-4 text-wrap sheet1-animation"
              color="teal-lighten-4"
            >
              <v-row class="d-flex justify-content-start align-items-center">
                <v-col cols="12" md="2" class="d-flex justify-center align-center">
                  <v-avatar size="100" color="grey-darken-1 m-3">
                    <img src="../assets/profile-pic.webp" width="70" alt="Profile Picture" />
                  </v-avatar>
                </v-col>
                <v-col
                  md="10"
                  class="d-flex flex-column text-center text-lg-start text-md-start text-wrap"
                >
                  <v-card-title>Laksh Solanki</v-card-title>
                  <v-card-subtitle>lakshsolanki848@gmail.com</v-card-subtitle>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              elevation="2"
              class="rounded-4 sheet3-animation"
              color="blue-lighten-2"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="9">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              elevation="2"
              class="rounded-4 sheet2-animation"
              color="deep-purple-lighten-3"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- Container 2 -->
      <v-container v-if="activeContent === 'content2'">
        <v-row>
          <v-col cols="12" md="9">
            <v-sheet
              min-height="268"
              rounded="lg"
              elevation="2"
              class="rounded-4 sheet1-animation"
              color="teal-accent-1"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet
              min-height="268"
              rounded="lg"
              elevation="2"
              class="rounded-4 sheet2-animation"
              color="orange-lighten-4"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="12">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              elevation="2"
              class="rounded-4 sheet2-animation"
              color="deep-purple-accent-1"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <!-- Container 3 -->
      <v-container v-if="activeContent === 'content3'">
        <v-row>
          <v-col cols="12" md="12">
            <v-card
              v-if="!showCard"
              class="pa-5 z-0 sheet1-animation border-1"
              rounded="4"
              elevation="1"
              color="light-blue-lighten-4"
            >
              <v-card-title class="text-h5 text-center m-3">Enter Credentials</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="checkCredentials">
                  <v-text-field v-model="id" label="ID" variant="outlined"></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                  ></v-text-field>
                  <v-btn type="submit" color="teal-lighten-3 border-1" variant="flat" elevation="1">Submit</v-btn>
                  <v-alert v-if="showError" type="error" class="mt-3 rounded-4" color="red" elevation="2"
                    >Invalid ID or password</v-alert
                  >
                </v-form>
              </v-card-text>
            </v-card>
            <v-container v-if="showCard">
              <v-card class="mx-auto z-0 sheet1-animation" rounded="3" elevation="1" border="1">
                <v-card-title
                  class="d-flex flex-wrap gap-1 justify-content-center align-center pe-2"
                >
                  <v-icon>mdi-account</v-icon>
                  <span class="ms-1">Student Submitted List</span>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    density="compact"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo-filled"
                    flat
                    hide-details
                    single-line
                  ></v-text-field>
                </v-card-title>
                <v-card-text class="pt-4">
                  <v-table height="500px" fixed-header>
                    <thead>
                      <tr>
                        <th class="text-left">Roll No.</th>
                        <th class="text-left">Submittion</th>
                        <th class="text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="i in 48"
                        :key="i"
                        :ref="
                          (el) => {
                            if (el) rowRefs[i - 1] = el
                          }
                        "
                        :class="{ highlight: search && i === parseInt(search) }"
                      >
                        <td>{{ i }}</td>
                        <td>
                          <span
                            v-if="submissions[i - 1].status === 'submitted'"
                            class="text-green font-weight-bold"
                            >Submitted</span
                          >
                          <span
                            v-else-if="submissions[i - 1].status === 'not-submitted'"
                            class="text-red font-weight-bold"
                            >Not Submitted</span
                          >
                          <div v-else class="d-flex">
                            <v-btn
                              size="small"
                              color="green"
                              @click="updateSubmission(i - 1, 'submitted')"
                              >Submitted</v-btn
                            >
                            <v-btn
                              size="small"
                              color="red"
                              class="ml-2"
                              @click="updateSubmission(i - 1, 'not-submitted')"
                              >Not Submitted</v-btn
                            >
                          </div>
                        </td>
                        <td>
                          <v-btn size="small" icon @click="editSubmission(i - 1)">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </td>
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

  .container-animate {
    animation: none !important;
  }
}

.sheet1-animation {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.sheet2-animation {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.sheet3-animation {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.highlight {
  background-color: rgb(255, 255, 120);
  color: black;
}

.container-animate {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
