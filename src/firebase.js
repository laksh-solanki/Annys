// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB-ZFM6DPIV8czRgj5iNssEgkOmGclyHuQ',
  authDomain: 'annys-01.firebaseapp.com',
  projectId: 'annys-01',
  storageBucket: 'annys-01.firebasestorage.app',
  messagingSenderId: '828890479997',
  appId: '1:828890479997:web:002c94a510048722eea014',
  measurementId: 'G-H31S4JJVJH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
