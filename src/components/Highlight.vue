'''<template>
  <span v-html="highlightedText"></span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
});

const highlightedText = computed(() => {
  if (!props.search) {
    return props.text;
  }
  const regex = new RegExp(`(${props.search})`, 'gi');
  return props.text.replace(regex, '<span class="highlight">$1</span>');
});
</script>

<style>
.highlight {
  background-color: yellow;
  font-weight: bold;
}
</style>
'''