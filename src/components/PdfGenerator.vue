<template>
  <div>
    <v-btn @click="generatePdf" color="primary">Download PDF</v-btn>
  </div>
</template>

<script setup>
import { jsPDF } from 'jspdf';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const generatePdf = () => {
  const doc = new jsPDF();

  // A4 dimensions in mm
  const a4Width = 210;
  const a4Height = 297;

  // Add a background image
  const imageUrl = '/src/assets/IMG_20250929_221837.jpg';
  doc.addImage(imageUrl, 'JPEG', 0, 0, a4Width, a4Height);

  let y = 129;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(27);
  doc.text(String(props.formData.fname).toUpperCase(), 105, y, { align: 'center' });

  y += 10;

  doc.save('student-registration.pdf');
};

defineExpose({
  generatePdf,
});
</script>