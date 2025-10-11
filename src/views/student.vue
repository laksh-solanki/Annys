<template>
  <v-container class="student-container">
    <profilecard :form-data="form" class="profile-card-for-pdf" />
    <v-card class="pa-5 card-animation card-container" elevation="2" border="1" rounded="3">
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
                :items="['Window Server administrator/IT Support Specialist', 'Web Developer', 'Cloud Engineer/Cloud Solution Architect', 'Web & API Development Specialist', 'Python for Computer Vision: Theory and Hands-On Projects']"
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
                  <v-btn v-bind="props" color="#1976D2" type="submit"
                    text="Submit" class="mr-4" :loading="loading"></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Reset the form" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="#616161" type="reset" text="Reset"
                    :loading="loading"></v-btn>
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
</template>

<script setup>
import profilecard from '@/components/pdf_view.vue';
import { ref, reactive } from 'vue'
import axios from 'axios'
import PdfGenerator from '@/components/PdfGenerator.vue'

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
    const res = await axios.put('http://localhost:5000/register', form)
    if (res.status === 200) {
      pdfGenerator.value.generatePdf()
    }
  } catch (err) {
    text.value = 'Error: ' + err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card-container {
  width: 100%;
  background-color: #e3f2fd;
  /* Light blue color */
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

.profile-card-for-pdf {
  position: absolute;
  left: -9999px;
  top: -9999px;
}
</style>
