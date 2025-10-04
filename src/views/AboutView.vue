<template>
  <div class="about-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="text-center About-header">
          <h1 class="display-2 font-weight-bold mb-4">About Our Company</h1>
          <p class="subheading-1">
            We are a team of passionate individuals dedicated to creating innovative solutions for
            the future.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-content- align-center">
          <img src="../assets/use-1.svg" class="About-image ms-auto" alt="" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>

</script>

<style scoped>
.about-page {
  width: 100%;
  height: auto;
  padding: 0;
  animation: color-change-2x 5s linear infinite alternate both;

  & .About-header {
    width: 100%;
    height: 91vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .About-image {
    width: 100%;
    border: 3px solid #000000;
    border-radius: 10px;
    animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
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

@keyframes color-change-2x {
  0% {
    background: #19dcea;
  }

  100% {
    background: #b22cff;
  }
}
</style>
