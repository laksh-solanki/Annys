<template>
  <v-container class="student-container">
    <v-card class="pa-5 card-animation card-container" elevation="4" rounded="5">
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
                rounded="4" aria-required="true"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.email" label="Email" variant="outlined" name="email" id="email"
                rounded="4"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.studentMobile" :counter="10" label="Student Mobile No." variant="outlined"
                name="studentMobile" id="studentMobile" rounded="4"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.parentsMobile" :counter="10" label="Parents Mobile No." variant="outlined"
                name="parentsMobile" id="parentsMobile" rounded="4"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12">
              <h3 class="text-h6">Academic Details</h3>
              <v-divider class="my-3"></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.prnNo" label="PRN No." variant="outlined" name="prnNo" id="prnNo"
                rounded="4"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.rollNo" label="Roll No." variant="outlined" name="rollNo" id="rollNo"
                rounded="4"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12" md="9" class="d-flex justify-center justify-content-lg-start">
              <v-tooltip text="Submit the form" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="primary" @click="snackbar = true" type="submit" variant="tonal"
                    text="Submit" class="mr-4" :loading="loading"></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Reset the form" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="secondary" type="reset" text="Reset" variant="tonal"
                    :loading="loading"></v-btn>
                </template>
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="3" class="p-0 d-flex justify-center justify-content-lg-end">
              <v-card-actions>
                <PdfGenerator :form-data="form" ref="pdfGenerator" />
              </v-card-actions>
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
</template>

<script setup>
const snackbar = ref(false)
const text = ref('')
const timeout = ref(2000)
import { ref, reactive } from 'vue'
import axios from 'axios'
import PdfGenerator from '@/components/PdfGenerator.vue'

const form = reactive({
  fname: '',
  email: '',
  studentMobile: '',
  parentsMobile: '',
  prnNo: '',
  rollNo: '',
})

const pdfGenerator = ref(null)

const submitForm = async () => {
  try {
    const res = await axios.post('http://localhost:5000/register', form)
    if (res.status === 200) {
      pdfGenerator.value.generatePdf()
    }
  } catch (err) {
    text.value = 'Error: ' + err.message
  }
}
</script>

<style scoped>
.card-container {
  max-width: 900px;
  width: 100%;
}

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

.student-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
