<template>
  <v-tooltip text="Download PDF" location="top">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" @click="generatePdf" variant="tonal" color="white" text="Download PDF"></v-btn>
    </template>
  </v-tooltip>
</template>

<script setup>
import { jsPDF } from 'jspdf'
import imageUrl from '../assets/IMCA.jpg'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})

const generatePdf = () => {
  const doc = new jsPDF()

  // A4 dimensions in mm
  const a4Width = 210
  const a4Height = 297

  // Add a background image

  doc.addImage(imageUrl, 'JPEG', 0, 0, a4Width, a4Height)

  let y = 129

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(27)
  doc.text(String(props.formData.fname).toUpperCase(), 105, y, { align: 'center' })

  y += 10

  let t = 167

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.text(String(props.formData.course).toUpperCase(), 105, t, { align: 'center' })

  t += 10

  doc.save(String(props.formData.course).toUpperCase() + '.pdf')
}

defineExpose({
  generatePdf,
})
</script>
