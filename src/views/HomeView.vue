<template>
  <div class="home">
    <section class="hero">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <h1 class="hero-title">Building the<p class="main-text"> Annys</p> Future, Today.</h1>
            <p class="hero-subtitle">We provide innovative solutions for your business needs. Our team of experts is
              dedicated to delivering high-quality results.</p>
            <div class="hero-buttons">
              <v-btn class="hero-button" color="primary" large>Our Services</v-btn>
              <v-btn class="hero-button" outlined color="primary" large>Contact Us</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Professional Team" class="hero-image"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oooh+Baby&display=swap');

.home {
  font-family: 'Poppins', sans-serif;
  color: #4f4f4f;
}

.hero {
  background-color: #ffffff;
  padding: 6rem 0;
  height: 607px;
}

.main-text {
  display: inline-block;
  font-family: "Oooh Baby", cursive;
  font-weight: 900;
  font-size: larger;
  margin-left: 60px;
  font-style: normal;
  color: red;
}

.hero-title {
  font-family: "Bebas Neue", sans-serif;
  font-size: 70px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-buttons .v-btn {
  margin-right: 1rem;
  min-width: 160px;
}

.hero-image {
  border-radius: 8px;
}

.features {
  background-color: #f9f9f9;
  padding: 6rem 0;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4rem;
}

.feature-card {
  background-color: transparent;
  text-align: center;
}

.feature-icon {
  font-size: 3.5rem;
  color: #1976D2;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-description {
  font-size: 1.1rem;
  line-height: 1.6;
}

.about-us {
  background-color: #ffffff;
  padding: 6rem 0;
}

.about-us-image {
  border-radius: 8px;
}

.about-us-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}
</style>