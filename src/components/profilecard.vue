<template>
  <div id="profile-card-container" color="transparent" flat>
    <h1 class="certi_name">{{ formData.fname }}</h1>
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
#profile-card-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.certi_name {
  margin-top: 250px !important;
  font-weight: bolder !important;
  color: black !important;
}
</style>