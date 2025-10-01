<template>
  <nav class="navbar navbar-expand-lg shadow-sm w-100 bg-light z-3 position-sticky top-0">
    <div class="container">
      <router-link class="navbar-brand img-style" to="/"><img src="../assets/Main-logo.png" alt=""
          width="40" /></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse w-100 navbar-collapse justify-content-center" id="navbarScroll">
        <ul class="nav navbar-nav gap-3 flex-row w-100 justify-content-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Student">Student</router-link>
          </li>
          <li class="dropdown nav-item">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Settings
            </a>
            <ul class="dropdown-menu position-absolute">
              <li><router-link class="dropdown-item" to="/profile"><i
                    class="fa-solid fa-user me-2"></i>Profile</router-link></li>
              <li><router-link class="dropdown-item" to="/settings"><i
                    class="fa-solid fa-gear me-2"></i>Settings</router-link></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><router-link class="dropdown-item" to="/Help"><i
                    class="fa-solid fa-circle-question me-2"></i>Help</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oooh+Baby&display=swap');

.img-style {
  font-family: 'Oooh Baby', cursive;
  margin: 0%;
  padding: 0%;
  margin-left: 20px;
}

.nav-link {
  color: black;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.dropdown-menu[data-bs-popper] {
  left: -75px !important;
}

.dropdown-menu {
  z-index: 1000;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);

}
</style>
