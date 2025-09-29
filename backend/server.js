const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// MongoDB connection
const uri = 'mongodb+srv://Student_reg:Student_reg.12345@cluster0.prbmefr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' // paste your Atlas URI
const client = new MongoClient(uri)

let studentsCollection

async function connectDB() {
  try {
    await client.connect()
    studentsCollection = client.db('Student-regist').collection('Students')
    console.log('✅ Connected to MongoDB Atlas')
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err)
  }
}
connectDB()

// API route to save student data
app.post('/student-registration', async (req, res) => {
  try {
    const studentData = {
      fname: req.body.fname,
      email: req.body.email,
      studentMobile: req.body.studentMobile,
      parentsMobile: req.body.parentsMobile,
      prnNo: req.body.prnNo,
      rollNo: req.body.rollNo,
      createdAt: new Date(),
    }

    await studentsCollection.insertOne(studentData)
    res.json({ success: true, message: 'Student registered successfully!' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'))
