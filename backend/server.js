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

// API route to save student data
app.post('/register', async (req, res) => {
  try {
    const studentData = req.body;

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
