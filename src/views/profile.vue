<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4">
          <v-card-title class="text-h4 text-center">Profile</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-avatar size="120" class="mb-4">
                  <v-img v-if="profilePhoto" :src="profilePhoto" alt="Profile Photo"></v-img>
                  <v-icon v-else size="60">mdi-account-circle</v-icon>
                </v-avatar>
                <v-file-input
                  v-model="selectedFile"
                  label="Select Profile Photo"
                  accept="image/*"
                  @change="handleFileSelect"
                  prepend-icon="mdi-camera"
                  class="mb-4"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="userName"
                  label="Name"
                  readonly
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="userEmail"
                  label="Email"
                  readonly
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const selectedFile = ref(null)
const profilePhoto = ref(localStorage.getItem('profilePhoto') || null)

const userName = computed(() => authStore.user?.username || 'N/A')
const userEmail = computed(() => authStore.user?.email || 'N/A')

const handleFileSelect = () => {
  if (selectedFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePhoto.value = e.target.result
      localStorage.setItem('profilePhoto', e.target.result)
    }
    reader.readAsDataURL(selectedFile.value)
  }
}

onMounted(() => {
  // Ensure user is logged in
  if (!authStore.user) {
    // Redirect to login if not authenticated
    // But since router guard is there, maybe not needed
  }
})
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
