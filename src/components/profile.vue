<template>
  <v-container>
    <v-row justify="center" align="center" class="pa-2">
      <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large">
              <span class="text-h5">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card rounded="3" class="mt-3" width="220" elevation="4">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown" size="large">
                <span class="text-h6">{{ userInitials }}</span>
              </v-avatar>

              <h3 class="mt-3">{{ userName }}</h3>
              <p class="text-caption mt-1">
                {{ userEmail }}
              </p>
              <v-divider class="my-3"></v-divider>
<v-btn variant="text" @click="$router.push('/profile')"> Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" @click="handleSignOut"> Disconnect </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userInitials = computed(() => authStore.user?.initials || 'U')
const userName = computed(() => authStore.user?.username || 'Guest User')
const userEmail = computed(() => authStore.user?.email || 'No email provided')

const handleSignOut = () => {
  authStore.signOut()
  router.push('/signin')
}
</script>
