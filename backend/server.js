const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB connection
const uri =
  'mongodb+srv://Student_reg:Student_reg.12345@cluster0.prbmefr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // paste your Atlas URI
const client = new MongoClient(uri);

let studentDetailsCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('Student-regist');
    studentDetailsCollection = db.collection('Student-detail');
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}
connectDB();

app.post('/student-detail', async (req, res) => {
  try {
    const studentData = req.body;

    console.log('Received student detail request. Body:', studentData);
    const dataToInsert = {
      ...studentData,
      createdAt: new Date(),
    };

    if (!studentDetailsCollection) {
      console.error('MongoDB studentDetailsCollection is not initialized.');
      return res.status(500).json({ success: false, error: 'Database collection not ready.' });
    }

    const result = await studentDetailsCollection.insertOne(dataToInsert);
    console.log('MongoDB insert result:', result);
    res.json({ success: true, message: 'Student details saved successfully!' });
  } catch (err) {
    console.error('Error during student detail saving:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    if (!studentDetailsCollection) {
      console.error('MongoDB studentDetailsCollection is not initialized.');
      return res.status(500).json({ success: false, error: 'Database collection not ready.' });
    }

    const students = await studentDetailsCollection.find({}).toArray();
    res.json({ success: true, students });
  } catch (err) {
    console.error('Error during student data retrieval:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, '0.0.0.0', () => console.log('🚀 Server running at http://0.0.0.0:5000'));
app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});
