<template>
  <v-container>
    <v-card v-if="!isLoggedIn" class="pa-5 card-animation d-flex justify-content-center align-content-center"
      rounded="4" elevation="1" border="1">
      <v-card-text class="login-form-width">
        <v-card-title class="text-h5 text-center m-3">Enter Credentials</v-card-title>
        <v-form @submit.prevent="checkCredentials">
          <v-text-field v-model="id" label="ID" variant="outlined" autocomplete="username"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" variant="outlined" autocomplete="current-password"></v-text-field>
          <v-btn type="submit" color="primary" text="Submit"></v-btn>
          <v-alert v-if="showError" type="error" class="mt-3">Invalid ID or password</v-alert>
        </v-form>
      </v-card-text>
    </v-card>
    <div v-else>
      <template v-if="!showStudentForm">
        <v-row justify="center" class="text-center">
          <v-col cols="auto">
            <v-btn @click="showStudentForm = true" color="primary" width="auto" size="large" variant="outlined" prepend-icon="mdi-folder"
              text="Student Registration"></v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn variant="outlined" color="primary" width="285" size="large" prepend-icon="mdi-folder" text="Other Project"> </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn variant="outlined" color="primary" width="285" size="large" prepend-icon="mdi-folder" text="Main Project"></v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <Student v-model="showStudentForm" />
      </template>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import Student from '@/components/Student.vue'

const id = ref('')
const password = ref('')
const isLoggedIn = ref(false)
const showError = ref(false)
const showStudentForm = ref(false)

const fixedId = import.meta.env.VITE_APP_ID;
const fixedPassword = import.meta.env.VITE_APP_PASSWORD;

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
</style>
