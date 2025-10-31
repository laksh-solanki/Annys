<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useVModel } from '@vueuse/core'

const props = defineProps({
    modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const showStudentDetailForm = useVModel(props, 'modelValue', emit)

const form = ref(null)
const studentData = reactive({
    enrollmentNo: '',
    name: '',
    birthDate: '',
    phoneNo: '',
    abcIdNo: '',
    debNo: '',
    course: '',
})

const rules = {
    required: value => !!value || 'Field is required',
}

const message = ref('')
const messageType = ref('') // 'success' or 'error'
const isSaving = ref(false)

const showMessage = (msg, type) => {
    message.value = msg
    messageType.value = type
    setTimeout(() => {
        message.value = ''
        messageType.value = ''
    }, 5000)
}

const saveStudentDetails = async () => {
    const { valid } = await form.value.validate()
    if (!valid) {
        return
    }

    isSaving.value = true

    try {
        // The backend server is running on localhost:5000
        const response = await axios.post('http://localhost:5000/student-detail', studentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.data.success) {
            showMessage('Student details saved successfully!', 'success')
            form.value.reset()
            // Reset reactive data
            Object.keys(studentData).forEach((key) => (studentData[key] = ''))
        } else {
            showMessage('Error saving to database: ' + response.data.error, 'error')
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message
        showMessage('Error: ' + errorMessage, 'error')
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <v-card border="0" elevation="0" class="pa-5" v-if="showStudentDetailForm">
        <div class="d-flex justify-content-between">
            <v-btn icon="mdi-arrow-left" color="primary" variant="flat" @click="showStudentDetailForm = false"></v-btn>
        </div>
        <v-card-title class="text-center mb-4"> <v-icon class="m-0 mb-1">mdi-account</v-icon> Student
            Details</v-card-title>
        <v-card-text>
            <v-form ref="form" @submit.prevent="saveStudentDetails">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="studentData.enrollmentNo" label="Enrollment No." variant="outlined"
                            :rules="[rules.required]" required class="mb-2"
                            prepend-inner-icon="mdi-account-details"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="studentData.name" variant="outlined" label="Full Name"
                            :rules="[rules.required]" prepend-inner-icon="mdi-account" required
                            class="mb-2"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="studentData.birthDate" label="Birth Date" variant="outlined" required
                            :rules="[rules.required]" prepend-inner-icon="mdi-calendar" hint="✔ : 29-12-2006"
                            type="date" class="mb-2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="studentData.phoneNo" variant="outlined" label="Phone No."
                            :rules="[rules.required]" prepend-inner-icon="mdi-phone" type="tel" hint="✔ : 12345 67890"
                            class="mb-2" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="studentData.abcIdNo" label="ABC ID No." variant="outlined"
                            :rules="[rules.required]" prepend-inner-icon="mdi-account-details"
                            hint="✔ : 123 456 789 012" required class="mb-2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="studentData.debNo" label="DEB No." variant="outlined"
                            :rules="[rules.required]" prepend-inner-icon="mdi-account-details"
                            hint="✔ : 123 456 789 012" required class="mb-2"></v-text-field>
                    </v-col>
                </v-row>
                <v-select v-model="studentData.course"
                    :items="['BA', 'MA', 'M.Com', 'B.Com', 'B.Sc', 'M.Sc', 'B.Tech', 'M.Tech']" label="Course"
                    variant="outlined" :rules="[rules.required]" class="my-3" required
                    prepend-inner-icon="mdi-book"></v-select>
                <v-btn :loading="isSaving" type="submit" color="primary" block class="mt-4">
                    {{ isSaving ? 'Saving...' : 'Save Student Details' }}
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-alert v-if="message" :type="messageType" class="mt-4">
                {{ message }}
            </v-alert>
        </v-col>
    </v-row>
</template>
