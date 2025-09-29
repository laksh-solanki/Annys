<script setup>
import { ref } from "vue";
import axios from "axios";

const fname = ref("");
const email = ref("");
const studentMobile = ref("");
const parentsMobile = ref("");
const prnNo = ref("");
const rollNo = ref("");
const message = ref("");

const submitForm = async () => {
  try {
    const res = await axios.post("http://localhost:5000/register", {
      fname: fname.value,
      email: email.value,
      studentMobile: studentMobile.value,
      parentsMobile: parentsMobile.value,
      prnNo: prnNo.value,
      rollNo: rollNo.value,
    });

    message.value = res.data.message;
  } catch (err) {
    message.value = "Error: " + err.message;
  }
};
</script>

<template>
  <v-container>
    <v-card class="pa-5" elevation="1">
      <v-card-title class="text-h5 text-center">Student Registration Form</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12">
              <h3 class="text-h6">Personal Details</h3>
              <v-divider class="my-3"></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="fname" label="Full Name" variant="outlined" name="fname" id="fname"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" label="Email" variant="outlined" name="email" id="email"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="studentMobile" label="Student Mobile No." variant="outlined" name="studentMobile"
                id="studentMobile"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="parentsMobile" label="Parents Mobile No." variant="outlined" name="parentsMobile"
                id="parentsMobile"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12">
              <h3 class="text-h6">Academic Details</h3>
              <v-divider class="my-3"></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="prnNo" label="PRN No." variant="outlined" name="prnNo" id="prnNo"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="rollNo" label="Roll No." variant="outlined" name="rollNo" id="rollNo"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12" class="text-center">
              <v-btn color="primary" class="mr-4">Submit</v-btn>
              <v-btn color="secondary">Reset</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <p>{{ message }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 10px;
}
</style>
