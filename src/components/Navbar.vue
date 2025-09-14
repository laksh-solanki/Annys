<template>
  <nav class="navbar navbar-expand-lg shadow-sm bg-info" data-bs-theme="light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Annys</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse mx-5 justify-content-evenly" id="navbarScroll">
        <ul class="nav nav-pills navbar-nav flex-row justify-content-evenly mx-auto my-1 fs-6"  id="pills-tab" role="tablist"> 
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Settings
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
              <li><router-link class="dropdown-item" to="/settings">Settings</router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-info" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
