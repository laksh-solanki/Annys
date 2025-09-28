// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC0ljauvdun0DhjZN9Feqqd6TVWNAi2w98',
  authDomain: 'annys-123.firebaseapp.com',
  projectId: 'annys-123',
  storageBucket: 'annys-123.firebasestorage.app',
  messagingSenderId: '53937794697',
  appId: '1:53937794697:web:92377ae1425a9c26f16058',
  measurementId: 'G-SLQBFQN2Y1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
