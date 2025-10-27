<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useVModel } from '@vueuse/core'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import backgroundImage from '@/assets/IMCA.jpeg';

const snackbar = ref(false)
const text = ref('')
const timeout = ref(3000)

const props = defineProps({
    modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const showFullForm = useVModel(props, 'modelValue', emit)

const form = reactive({
    fname: '',
    email: '',
    studentMobile: '',
    course: '',
    prnNo: '',
    rollNo: '',
})

const loading = ref(false)
const dialog = ref(false);
const pdfUrl = ref('');

const generatePdf = () => {
    const card = document.getElementById('profile-card-container');
    if (!card) {
        console.error('PDF template element not found.');
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
    a.download = `${form.course}.pdf`;
    a.click();
};

const submitForm = async () => {
    loading.value = true;
    try {
        const res = await axios.post('http://localhost:5000/register', { ...form });
        if (res.status === 200) {
            text.value = 'Form submitted successfully!';
            snackbar.value = true;
        }
    } catch (err) {
        text.value = 'Error: ' + err.message;
        snackbar.value = true;
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <!-- PDF Template (hidden) -->
    <div class="profile-card-for-pdf">
        <div id="profile-card-container">
            <p class="certi_name">{{ form.fname }}</p>
            <p class="certi_course">
                {{ form.course }}
            </p>
        </div>
    </div>

    <!-- Student Form -->
    <v-card v-if="showFullForm" class="pa-5 card-animation w-100" border="1" elevation="2" rounded="3">
        <div class="d-flex justify-content-end">
            <v-btn icon="mdi-close" variant="text" @click="showFullForm = false" position="relative"></v-btn>
        </div>
        <v-card-title class="text-h5 text-wrap text-center">
            Student Registration Form
        </v-card-title>
        <v-card-text class="mt-4">
            <v-form @submit.prevent="submitForm" ref="studentForm">
                <v-row>
                    <v-col cols="12">
                        <h3 class="text-h6 mt-4 text-lg-start text-md-start text-center">Personal Details</h3>
                        <v-divider class="my-3"></v-divider>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.fname" label="Full Name" variant="outlined" name="fname" id="fname"
                            rounded="2" aria-required="true"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.email" label="Email" variant="outlined" name="email" id="email"
                            rounded="2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.studentMobile" :counter="10" label="Student Mobile No."
                            variant="outlined" name="studentMobile" id="studentMobile" rounded="2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.course"
                            :items="['Window Server administrator/IT Support Specialist', 'Web Developer', 'Cloud Engineer/Cloud Solution Architect', 'Web & API Development Specialist', 'Python for Computer Vision: Theory and Project']"
                            label="Course" :list-props="{ bgColor: 'light' }" variant="outlined" name="course"
                            id="course" rounded="2"></v-select>
                    </v-col>
                </v-row>

                <v-row class="mt-3">
                    <v-col cols="12">
                        <h3 class="text-h6 text-lg-start text-md-start text-center">Academic Details</h3>
                        <v-divider class="my-3"></v-divider>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.prnNo" label="PRN No." variant="outlined" name="prnNo" id="prnNo"
                            rounded="2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.rollNo" label="Roll No." variant="outlined" name="rollNo"
                            id="rollNo" rounded="2"></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mt-5 justify-content-start">
                    <v-col cols="12" md="9" class="d-flex justify-center justify-content-lg-start">
                        <v-tooltip text="Submit the form" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" color="#1976D2" type="submit" text="Submit"
                                    prepend-icon="mdi-check" class="mr-4" :loading="loading"></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Reset the form" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" color="#616161" type="reset" text="Reset"
                                    prepend-icon="mdi-refresh" :loading="loading"></v-btn>
                            </template>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="12" md="3" class="d-flex justify-center justify-content-lg-end">
                        <v-tooltip text="Preview and Download the certificate" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" @click="generatePdf" color="primary" text="Certificate"
                                    prepend-icon="mdi-file-certificate-outline"></v-btn>
                            </template>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-form>
            <v-snackbar v-model="snackbar" location="bottom right" style="margin-bottom: -60px;" :timeout="timeout"
                transition="slide-x-reverse-transition">
                {{ text }}
                <template v-slot:actions>
                    <v-btn color="blue" variant="text" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-card-text>
    </v-card>

    <!-- PDF Preview Dialog -->
    <v-dialog v-model="dialog" max-width="800">
        <v-card>
            <v-card-title class="p-0 d-flex justify-space-between align-center">
                <v-btn color="primary" @click="downloadPdf" text="Download" prepend-icon="mdi-download" :loading="loading" variant="text"></v-btn>
                <v-btn icon @click="dialog = false" variant="text">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <embed :src="pdfUrl" style="width: 100%; height: 500px;" frameborder="0"></embed>
        </v-card>
    </v-dialog>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.profile-card-for-pdf {
    position: absolute;
    left: -9999px;
    top: -9999px;
    width: 1123px;
    /* A4 width in pixels at 96 DPI for landscape */
    height: 794px;
    /* A4 height in pixels at 96 DPI for landscape */
}

#profile-card-container {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    flex-direction: column !important;
}

.certi_name {
    font-family: "Inter", sans-serif;
    width: 100% !important;
    text-align: center !important;
    font-size: 80px;
    margin-top: 264px;
    font-weight: 800 !important;
    color: black !important;
    padding: 0 !important;
    line-height: 1 !important;
}

.certi_course {
    font-family: "Inter", sans-serif;
    width: 100% !important;
    text-align: center !important;
    font-size: 40px;
    letter-spacing: 0 !important;
    font-weight: 800 !important;
    margin-top: 175px;
    color: black !important;
    padding: 0 !important;
    line-height: 1 !important;
}
</style>