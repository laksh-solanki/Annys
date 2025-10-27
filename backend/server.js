require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri =
  'mongodb+srv://Student_reg:Student_reg.12345@cluster0.prbmefr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // paste your Atlas URI
const client = new MongoClient(uri);

let studentsCollection;

async function connectDB() {
  try {
    await client.connect();
    studentsCollection = client.db('Student-regist').collection('Students');
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}
connectDB();

// API route to verify reCAPTCHA
app.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(verificationURL);
    const { success } = response.data;
    if (success) {
      res.json({ success: true, message: 'reCAPTCHA verification successful.' });
    } else {
      res.json({ success: false, message: 'reCAPTCHA verification failed.' });
    }
  } catch (error) {
    console.error('Error during reCAPTCHA verification:', error);
    res.status(500).json({ success: false, error: 'Error during reCAPTCHA verification.' });
  }
});

// API route to save student data
app.post('/register', async (req, res) => {
  try {
    const { token, ...studentData } = req.body;

    // Verify reCAPTCHA first
    const recaptchaResponse = await axios.post('http://localhost:5000/verify-recaptcha', { token });
    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed.' });
    }

    console.log('Received registration request. Body:', studentData);
    const dataToInsert = {
      ...studentData,
      createdAt: new Date(),
    };

    if (!studentsCollection) {
      console.error('MongoDB studentsCollection is not initialized.');
      return res.status(500).json({ success: false, error: 'Database collection not ready.' });
    }

    const result = await studentsCollection.insertOne(dataToInsert);
    console.log('MongoDB insert result:', result);
    res.json({ success: true, message: 'Student registered successfully!' });
  } catch (err) {
    console.error('Error during student registration:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});
