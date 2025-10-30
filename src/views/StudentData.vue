<template>
  <v-container>
    <v-card>
      <v-card-title><v-icon class="m-0 mb-1">mdi-account-group</v-icon> Student Data</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="search"
          label="Search..."
          class="mb-4"
          hide-details
          clearable
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="filteredStudents"
          class="elevation-1"
        >
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
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Highlight from '@/components/Highlight.vue';

const students = ref([]);
const search = ref('');

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
    const response = await axios.get('http://0.0.0.0:5000/students');
    if (response.data.success) {
      students.value = response.data.students;
    }
  } catch (error) {
    console.error('Error fetching student data:', error);
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