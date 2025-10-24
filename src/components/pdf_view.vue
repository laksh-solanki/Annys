<template>
  <div id="profile-card-container" color="transparent" flat>
    <p class="certi_name">{{ formData.fname }}</p>
    <p class="certi_course">
      {{ formData.course }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

#profile-card-container {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}

.certi_name {
  font-family: "Inter", sans-serif;
  width: 100% !important;
  text-align: center !important;
  font-size: 80px;
  margin-top: 264px;
  font-weight: 800 !important;
  color: black !important;
  padding: 0 !important;
  line-height: 1 !important;
}

.certi_course {
  font-family: "Inter", sans-serif;
  width: 100% !important;
  text-align: center !important;
  font-size: 40px;
  letter-spacing: 0 !important;
  font-weight: 800 !important;
  margin-top: 175px;
  color: black !important;
  padding: 0 !important;
  line-height: 1 !important;
}

@media screen and (max-width: 767px) {
  .certi_name {
    font-size: 22px !important;
    margin-top: 622px !important;
  }

  .certi_course {
    font-size: 12px !important;
    margin-top: 32px !important;
  }
}
</style>