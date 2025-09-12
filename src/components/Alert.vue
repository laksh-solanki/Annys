<template>
  <v-snackbar
    v-model="show"
    :color="alertColor"
    :timeout="timeout"
    location="bottom right"
    class="alert-snackbar"
  >
    {{ message }}
    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'error', // 'error' for red, 'success' for green
    validator: (value) => ['error', 'success'].includes(value)
  },
  timeout: {
    type: Number,
    default: 5000 // 5 seconds
  }
})

const show = ref(false)

const alertColor = computed(() => {
  return props.type === 'error' ? 'red' : 'green'
})

// Watch for message changes to show the alert
watch(() => props.message, (newMessage) => {
  if (newMessage) {
    show.value = true
  }
})
</script>

<style scoped>
</style>
