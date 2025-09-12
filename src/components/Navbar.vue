<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img :src="logo" alt="Annys Logo" height="40" class="me-2" />
        Annys
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="['collapse', 'navbar-collapse', { show: navbarOpen }]" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/feed" class="nav-link">Feed</router-link>
          </li>
        </ul>
        <form class="d-flex me-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
        <div v-if="isLoggedIn" class="d-flex align-items-center">
          <profile />
        </div>
        <router-link v-else to="/signin">
          <v-btn color="blue" rounded="5" variant="elevated">Sign In</v-btn>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import logo from '@/assets/logo.svg'
import profile from '@/components/profile.vue'

const router = useRouter()
const isLoggedIn = ref(false)
const auth = getAuth()
const navbarOpen = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const toggleNavbar = () => {
  navbarOpen.value = !navbarOpen.value
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1030;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-brand img {
  border-radius: 50%;
  transition: transform 0.2s;
}

.navbar-brand img:hover {
  transform: scale(1.1);
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #007bff !important;
}

.btn {
  border-radius: 20px;
  font-weight: 500;
}

.form-control {
  border-radius: 20px;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    margin-top: 1rem;
  }
}
</style>
