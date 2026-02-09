import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
const firebaseConfig = {
  apiKey: 'AIzaSyB-ZFM6DPIV8czRgj5iNssEgkOmGclyHuQ',
  authDomain: 'annys-01.firebaseapp.com',
  projectId: 'annys-01',
  storageBucket: 'annys-01.firebasestorage.app',
  messagingSenderId: '828890479997',
  appId: '1:828890479997:web:002c94a510048722eea014',
  measurementId: 'G-H31S4JJVJH',
}
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export { app }
export default analytics