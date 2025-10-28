<template>
  <div class="home h-100 w-100">
    <section class="hero">
      <v-container>
        <v-row class="align-center py-5 gap-5">
          <v-col cols="12" md="6" class="content-1 py-5 d-flex flex-column justify-center">
            <h1 class="hero-title">
              Building the
              <p class="main-text">Annys</p>
              Future, Today.
            </h1>
            <p class="hero-subtitle">
              We provide innovative solutions for your business needs. Our team of experts is
              dedicated to delivering high-quality results.
            </p>
            <div class="hero-buttons gap-2 d-flex flex-wrap">
              <v-btn class="hero-button" to="/project" rounded="5" width="200" height="50" color="white" text="Our Projects"
                variant="outlined" large></v-btn>
              <v-btn class="hero-button" to="/about" rounded="5" width="200" height="50" color="white"
                variant="outlined" text="About Us" large></v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <v-img :src="homeImage" alt="Professional Tea" class="hero-image image-animation"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import homeImage from '../assets/use-2.jpg'

export default {
  name: 'Home',
  data() {
    return {
      homeImage,
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oooh+Baby&display=swap');

.home {
  width: 100%;
  font-family: 'Poppins', sans-serif;
  color: #3d3d3d;
}

.hero {
  width: 100%;
  background: linear-gradient(90deg, #e0776a, #a178cd);
}

.content-1 {
  border-radius: 1000px;
  padding-right: 24px !important;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
}

.main-text {
  width: 100%;
  display: inline-block;
  font-family: 'Oooh Baby', cursive;
  font-weight: 900;
  font-size: larger;
  font-style: normal;
  text-decoration: none;
  text-underline-offset: 3px;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
  padding: 0%;
  margin: 0%;
  color: rgb(255, 255, 255);
}

.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 76px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(227, 227, 227);
}

.hero-image {
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 100%;
}

.image-animation {
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-right {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
