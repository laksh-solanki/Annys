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
#profile-card-container {
  width: 100% !important;  
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}

.certi_name {
  width: 100% !important;
  text-align: center !important;
  font-size: 80px !important;
  margin-top: 235px !important;
  font-weight: bolder !important;
  color: black !important;
  padding: 0 !important;
  line-height: 1 !important;
}

.certi_course {
  width: 100% !important;
  text-align: center !important;
  font-size: 50px !important;
  font-weight: bold !important;
  margin-top: 196px !important;
  color: black !important;
  padding: 0 !important;
  line-height: 1 !important;
}
</style>