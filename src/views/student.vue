<template>
  <v-container class="student-container" fluid>
    <v-card class="pa-5" style="max-width: 900px; width: 100%;" elevation="1">
      <v-card-title class="text-h5 text-center text-wrap">Student Registration Form</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12">
              <h3 class="text-h6">Personal Details</h3>
              <v-divider class="my-3"></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.fname" label="Full Name" variant="outlined" name="fname"
                id="fname"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.email" label="Email" variant="outlined" name="email"
                id="email"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.studentMobile" label="Student Mobile No." variant="outlined"
                name="studentMobile" id="studentMobile"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.parentsMobile" label="Parents Mobile No." variant="outlined"
                name="parentsMobile" id="parentsMobile"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12">
              <h3 class="text-h6">Academic Details</h3>
              <v-divider class="my-3"></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.prnNo" label="PRN No." variant="outlined" name="prnNo"
                id="prnNo"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.rollNo" label="Roll No." variant="outlined" name="rollNo"
                id="rollNo"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12" class="text-center">
              <v-btn color="primary" type="submit" class="mr-4">Submit</v-btn>
              <v-btn color="secondary" type="reset">Reset</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p>{{ message }}</p>
      </v-card-text>
      <v-card-actions class="justify-center">
        <PdfGenerator :form-data="form" ref="pdfGenerator" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
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

const message = ref('')
const pdfGenerator = ref(null)

const submitForm = async () => {
  try {
    const res = await axios.post('http://localhost:5000/register', form)
    if (res.status === 200) {
      pdfGenerator.value.generatePdf()
    }
  } catch (err) {
    message.value = 'Error: ' + err.message
  }
}
</script>

<style scoped>
.student-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #313131;
  background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;
  background-repeat: repeat;
}

.v-card {
  border-radius: 10px;
}
</style>
