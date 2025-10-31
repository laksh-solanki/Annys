<template>
  <v-card v-if="showStudentDataForm" class="pa-5 card-animation w-100" border="0" elevation="0">
    <div class="d-flex justify-content-start">
      <v-btn icon="mdi-arrow-left" color="primary" variant="flat" @click="showStudentDataForm = false"
        position="relative"></v-btn>
    </div>
    <v-card-title class="text-center text-wrap "><v-icon class="m-0 mb-1">mdi-account-group</v-icon> Student
      Data</v-card-title>
    <v-card-text>
      <v-text-field v-model="search" label="Search..." class="mb-4" hide-details clearable></v-text-field>
      <v-data-table :loading="loading" :headers="headers" :items="filteredStudents" class="elevation-1" fixed-header>
        <template v-slot:item.enrollmentNo="{ item }">
          <Highlight :text="item.enrollmentNo || 'no-field'" :search="search" />
        </template>
        <template v-slot:item.name="{ item }">
          <Highlight :text="item.name || 'no-field'" :search="search" />
        </template>
        <template v-slot:item.birthDate="{ item }">
          <Highlight :text="item.birthDate || 'no-field'" :search="search" />
        </template>
        <template v-slot:item.phoneNo="{ item }">
          <Highlight :text="item.phoneNo || 'no-field'" :search="search" />
        </template>
        <template v-slot:item.abcIdNo="{ item }">
          <Highlight :text="item.abcIdNo || 'no-field'" :search="search" />
        </template>
        <template v-slot:item.debNo="{ item }">
          <Highlight :text="item.debNo || 'no-field'" :search="search" />
        </template>
        <template v-slot:item.course="{ item }">
          <Highlight :text="item.course || 'no-field'" :search="search" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Highlight from '@/components/Highlight.vue';
import { useVModel } from '@vueuse/core';

const students = ref([]);
const search = ref('');
const loading = ref(true);
const error = ref(null);

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const showStudentDataForm = useVModel(props, 'modelValue', emit)

const headers = [
  { title: 'Enrollment No.', value: 'enrollmentNo' },
  { title: 'Name', value: 'name' },
  { title: 'Birth Date', value: 'birthDate' },
  { title: 'Phone No.', value: 'phoneNo' },
  { title: 'ABC ID No.', value: 'abcIdNo' },
  { title: 'DEB No.', value: 'debNo' },
  { title: 'Course', value: 'course' },
];

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axios.get('http://localhost:5000/students');
    if (response.data.success) {
      students.value = response.data.students;
    }
  } catch (err) {
    console.error('Error fetching student data:', err);
    error.value = 'Failed to load student data. Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
});

const filteredStudents = computed(() => {
  if (!search.value) {
    return students.value;
  }
  return students.value.filter(student => {
    return Object.values(student).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
</script>