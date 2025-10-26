<template>
  <v-tooltip text="Preview and Download the certificate" location="top">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" @click="generatePdf" class="mt-3" color="primary" text="Open Dialog"></v-btn>
    </template>
  </v-tooltip>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="p-0 ms-auto ">
        <v-btn color="primary" @click="downloadPdf">Download</v-btn>
        <v-btn icon @click="dialog = false" variant="plain">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <embed :src="pdfUrl" style="width: 100%; height: 500px;" frameborder="0"></embed>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import backgroundImage from '@/assets/IMCA.jpeg';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const dialog = ref(false);
const pdfUrl = ref('');

const generatePdf = () => {
  const card = document.getElementById('profile-card-container');
  if (!card) {
    console.error("Element with ID 'profile-card-container' not found.");
    return;
  }

  html2canvas(card, {
    backgroundColor: null,
    useCORS: true
  }).then((canvas) => {
    const cardImgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(backgroundImage, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    const cardWidth = pdfWidth;
    const cardHeight = (canvas.height * cardWidth) / canvas.width;
    const x = (pdfWidth - cardWidth) / 2;
    const y = (pdfHeight - cardHeight) / 2;
    pdf.addImage(cardImgData, 'PNG', x, y, cardWidth, cardHeight);
    const blob = pdf.output('blob');
    pdfUrl.value = URL.createObjectURL(blob) + '#toolbar=0';
    dialog.value = true;
  });
};

const downloadPdf = () => {
  const a = document.createElement('a');
  a.href = pdfUrl.value;
  a.download = 'pdf.pdf';
  a.click();
};

defineExpose({
  generatePdf,
});
</script>
