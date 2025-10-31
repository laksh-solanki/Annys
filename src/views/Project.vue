<template>
  <v-container>
    <v-card v-if="!isLoggedIn" class="pa-5 card-animation d-flex justify-content-center align-content-center"
      elevation="0" border="0">
      <v-card-text class="login-form-width">
        <v-card-title class="text-h5 text-center m-3"><v-icon class="mb-1">mdi-account-key</v-icon> Enter
          Credentials</v-card-title>
        <v-form @submit.prevent="checkCredentials">
          <v-text-field v-model="id" label="ID" variant="outlined" autocomplete="username" required
            prepend-icon="mdi-key-outline"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" variant="outlined"
            autocomplete="current-password" required prepend-icon="mdi-lock"></v-text-field>
          <v-btn type="submit" color="primary" text="Submit" prepend-icon="mdi-arrow-right"></v-btn>
          <v-alert v-if="showError" type="error" class="mt-3">Invalid ID or password</v-alert>
        </v-form>
      </v-card-text>
    </v-card>
    <div v-else>
      <v-dialog v-model="showStudentForm" fullscreen>
        <Student v-model="showStudentForm" />
      </v-dialog>
      <v-dialog v-model="showStudentDataForm" fullscreen>
        <StudentData v-model="showStudentDataForm" />
      </v-dialog>
      <v-dialog v-model="showStudentDetailForm" fullscreen>
        <StudentDetail v-model="showStudentDetailForm"/>
      </v-dialog>
      <v-row justify="center" class="text-center">
        <v-col cols="auto">
          <v-btn @click="showStudentForm = true" color="primary" width="285 " size="large" prepend-icon="mdi-folder"
            text="Student Registration"></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="showStudentDataForm = true" color="primary" width="285" size="large" prepend-icon="mdi-folder"
            text="Student Data"></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="showStudentDetailForm = true" color="primary" width="285" size="large"
            prepend-icon="mdi-folder" text="Student Details"></v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import Student from '@/components/Student.vue'
import StudentData from '@/components/StudentData.vue'
import StudentDetail from '@/components/StudentDetail.vue'

const id = ref('')
const password = ref('')
const isLoggedIn = ref(false)
const showError = ref(false)
const showStudentForm = ref(false)
const showStudentDataForm = ref(false)
const showStudentDetailForm = ref(false)

const fixedId = import.meta.env.VITE_APP_ID
const fixedPassword = import.meta.env.VITE_APP_PASSWORD

function checkCredentials() {
  if (id.value === fixedId && password.value === fixedPassword && id.value) {
    isLoggedIn.value = true
    showError.value = false
  } else {
    showError.value = true
  }
}
</script>

<style scoped>
.login-form-width {
  width: 500px;
}

.card-animation {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
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
