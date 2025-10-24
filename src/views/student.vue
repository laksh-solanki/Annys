<template>
  <v-container fluid>
    <v-card v-if="!showCard" class="pa-5 z-0 card-animation d-flex justify-center align-center" rounded="4"
      elevation="1" border="1">
      <v-card-text style="width: 500px;">
        <v-card-title class="text-h5 text-center m-3">Enter Credentials</v-card-title>
        <v-form @submit.prevent="checkCredentials">
          <v-text-field v-model="id" label="ID" variant="outlined"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" variant="outlined"></v-text-field>
          <v-btn type="submit" color="primary">Submit</v-btn>
          <v-alert v-if="showError" type="error" class="mt-3">Invalid ID or password</v-alert>
        </v-form>
      </v-card-text>
    </v-card>
    <v-container v-if="showCard">
      <profilecard :form-data="form" class="profile-card-for-pdf" />
      <v-card class="pa-5 card-animation w-100 border-2" elevation="3" rounded="4" color="cyan-lighten-3">
        <v-card-title class="text-h5 text-center text-wrap">Student Registration Form</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12">
                <h3 class="text-h6">Personal Details</h3>
                <v-divider class="my-3"></v-divider>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.fname" label="Full Name" variant="outlined" name="fname" id="fname"
                  rounded="2" aria-required="true"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.email" label="Email" variant="outlined" name="email" id="email"
                  rounded="2"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.studentMobile" :counter="10" label="Student Mobile No." variant="outlined"
                  name="studentMobile" id="studentMobile" rounded="2"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="form.course"
                  :items="['Window Server administrator/IT Support Specialist', 'Web Developer', 'Cloud Engineer/Cloud Solution Architect', 'Web & API Development Specialist', 'Python for Computer Vision: Theory and Project']"
                  label="Course" :list-props="{ bgColor: 'light' }" variant="outlined" name="course" id="course"
                  rounded="2"></v-select>
              </v-col>
            </v-row>

            <v-row class="mt-5">
              <v-col cols="12">
                <h3 class="text-h6">Academic Details</h3>
                <v-divider class="my-3"></v-divider>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.prnNo" label="PRN No." variant="outlined" name="prnNo" id="prnNo"
                  rounded="2"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.rollNo" label="Roll No." variant="outlined" name="rollNo" id="rollNo"
                  rounded="2"></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mt-5">
              <v-col cols="12" md="9" class="d-flex justify-center justify-content-lg-start">
                <v-tooltip text="Submit the form" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="#1976D2" type="submit" text="Submit" class="mr-4"
                      :loading="loading"></v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="Reset the form" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="#616161" type="reset" text="Reset" :loading="loading"></v-btn>
                  </template>
                </v-tooltip>
              </v-col>
              <v-col cols="12" md="3" class="p-0 d-flex justify-center justify-content-lg-end">
                <PdfGenerator :form-data="form" ref="pdfGenerator" />
              </v-col>
            </v-row>
          </v-form>
          <v-snackbar v-model="snackbar" location="bottom right" style="margin-bottom: -60px;" :timeout="timeout"
            transition="slide-x-reverse-transition">
            {{ text }}
            <template v-slot:actions>
              <v-btn color="blue" variant="text" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import profilecard from '@/components/pdf_view.vue';
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import PdfGenerator from '@/components/PdfGenerator.vue'

const snackbar = ref(false)
const text = ref('')
const timeout = ref(3000)

const form = reactive({
  fname: '',
  email: '',
  studentMobile: '',
  course: '',
  prnNo: '',
  rollNo: '',
})

const pdfGenerator = ref(null)
const loading = ref(false)

const submitForm = async () => {
  loading.value = true
  try {
    const res = await axios.post('http://localhost:5000/register', form)
    if (res.status === 200) {
      pdfGenerator.value.generatePdf()
      text.value = 'Form submitted successfully!'
      snackbar.value = true
    }
  } catch (err) {
    text.value = 'Error: ' + err.message
    snackbar.value = true
  } finally {
    loading.value = false
  }
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

onMounted(() => {
  loadRecaptcha().catch((error) => console.error('reCAPTCHA script failed to load:', error))
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
</script>

<style scoped>
.card-animation {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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

.profile-card-for-pdf {
  position: absolute;
  left: -9999px;
  top: -9999px;
}
</style>