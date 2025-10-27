<template>
  <v-container>
    <v-card v-if="!showCard" class="pa-5 z-0 card-animation d-flex justify-content-center align-content-center"
      rounded="4" elevation="1" border="1">
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
    <v-container>
      <Student v-if="showCard" />
    </v-container>  
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Student from '@/components/Student.vue'

const id = ref('')
const password = ref('')
const showCard = ref(false)
const showError = ref(false)

const fixedId = 'Lucky2912'
const fixedPassword = 'Lucky.2912'

function checkCredentials() {
  if (id.value === fixedId && password.value === fixedPassword) {
    showCard.value = true
    showError.value = false
  } else {
    showError.value = true
  }
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
