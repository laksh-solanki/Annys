// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQu8EC53MyYFSw_6xGwhxt5Fp0xRWlRYE",
  authDomain: "annys-2912.firebaseapp.com",
  projectId: "annys-2912",
  storageBucket: "annys-2912.firebasestorage.app",
  messagingSenderId: "1045514901155",
  appId: "1:1045514901155:web:70aabb5089178eb3edd116",
  measurementId: "G-Y42ST3X7Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);