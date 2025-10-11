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
  width: 100%;  
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.certi_name {
  width: 100%;
  text-align: center;
  font-size: 80px !important;
  margin-top: 235px !important;
  font-weight: bolder !important;
  color: black !important;
  margin: 0;
  padding: 0;
  line-height: 1;
}

.certi_course {
  width: 100%;
  text-align: center;
  font-size: 50px !important;
  font-weight: bold !important;
  margin-top: 210px !important;
  color: black !important;
  padding: 0;
  line-height: 1;
}
</style>