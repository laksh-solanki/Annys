<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const form = ref(null);
const studentData = reactive({
    enrollmentNo: '',
    name: '',
    birthDate: '',
    phoneNo: '',
    abcIdNo: '',
    debNo: '',
    course: ''
});

const message = ref('');
const messageType = ref(''); // 'success' or 'error'
const isSaving = ref(false);

const showMessage = (msg, type) => {
    message.value = msg;
    messageType.value = type;
    setTimeout(() => {
        message.value = '';
        messageType.value = '';
    }, 5000);
};

const saveStudentDetails = async () => {
    if (!form.value.checkValidity()) {
        form.value.reportValidity();
        return;
    }

    isSaving.value = true;

    const formData = new FormData();
    for (const key in studentData) {
        formData.append(key, studentData[key]);
    }

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        if (input.files.length > 0) {
            formData.append(input.name, input.files[0]);
        }
    });

    try {
        // The backend server is running on localhost:5000
        const response = await axios.post('http://localhost:5000/student-detail', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.success) {
            showMessage('Student details saved successfully!', 'success');
            form.value.reset();
            // Reset reactive data
            Object.keys(studentData).forEach(key => studentData[key] = '');
        } else {
            showMessage('Error saving to database: ' + response.data.error, 'error');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        showMessage('Error: ' + errorMessage, 'error');
    } finally {
        isSaving.value = false;
    }
};
</script>

<template>
    <div class="container">
        <h1>Student Details Saver</h1>
        <form ref="form" @submit.prevent="saveStudentDetails" id="studentForm">
            <div class="form-group">
                <label for="enrollmentNo">Enrollment No.</label>
                <input type="text" id="enrollmentNo" v-model="studentData.enrollmentNo" required>
            </div>

            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" v-model="studentData.name" required>
            </div>

            <div class="form-group">
                <label for="birthDate">Birth Date</label>
                <input type="date" id="birthDate" v-model="studentData.birthDate" required>
            </div>

            <div class="form-group">
                <label for="phoneNo">Phone No.</label>
                <input type="tel" id="phoneNo" v-model="studentData.phoneNo" required>
            </div>

            <div class="form-group">
                <label for="abcIdNo">ABC ID No.</label>
                <input type="text" id="abcIdNo" v-model="studentData.abcIdNo" required>
            </div>

            <div class="form-group">
                <label for="debNo">DEB No.</label>
                <input type="text" id="debNo" v-model="studentData.debNo" required>
            </div>

            <div class="form-group">
                <label for="course">Course</label>
                <select id="course" v-model="studentData.course" required>
                    <option value="">Select Course</option>
                    <option value="BA">BA</option>
                    <option value="MA">MA</option>
                    <option value="M.Com">M.Com</option>
                    <option value="B.Com">B.Com</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="M.Sc">M.Sc</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                </select>
            </div>
            <div class="btn-container">
                <button type="submit" :disabled="isSaving">
                    {{ isSaving ? 'Saving...' : 'Save Student Details' }}
                </button>
            </div>
        </form>

        <div v-if="message" :class="['message', messageType]">
            {{ message }}
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
    max-width: 800px;
    margin: 20px auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    color: #333;
}

h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
}

input,
select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border 0.3s;
}

input:focus,
select:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

.file-input {
    padding: 8px;
}

.btn-container {
    text-align: center;
    margin-top: 30px;
}

button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 14px 30px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #2980b9;
}

button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
}

.message {
    margin-top: 20px;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
}

.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.section-title {
    font-size: 18px;
    margin-top: 25px;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    color: #3498db;
}
</style>