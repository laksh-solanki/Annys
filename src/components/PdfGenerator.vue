<template>
  <v-tooltip text="Download PDF" location="top">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" @click="generatePdf" variant="tonal" color="#4CAF50" text="Download PDF"></v-btn>
    </template>
  </v-tooltip>
</template>

<script setup>
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import backgroundImage from '@/assets/IMCA.jpg';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const generatePdf = () => {
  const card = document.getElementById('profile-card-container'); // The element to capture
  if (!card) {
    console.error("Element with ID 'profile-card-container' not found.");
    return;
  }

  html2canvas(card, {
    backgroundColor: null, // Make the background transparent
    useCORS: true
  }).then((canvas) => {
    const cardImgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add the background image first, covering the whole page
    pdf.addImage(backgroundImage, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Add the profile card image on top of the background
    // Centering the card on the page
    const cardWidth = 90; // Adjust as needed
    const cardHeight = (canvas.height * cardWidth) / canvas.width;
    const x = (pdfWidth - cardWidth) / 2;
    const y = (pdfHeight - cardHeight) / 2;
    pdf.addImage(cardImgData, 'PNG', x, y, cardWidth, cardHeight);

    pdf.save(`${props.formData.fname}_profile.pdf`);
  });
};

defineExpose({
  generatePdf,
})
</script>
