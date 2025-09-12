import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'   
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBmxnLcizoxCxSqXDnbr6YvwZpkR4-7hRU",
  authDomain: "annys-8eb9d.firebaseapp.com",
  projectId: "annys-8eb9d",
  storageBucket: "annys-8eb9d.firebasestorage.app",
  messagingSenderId: "903124008619",
  appId: "1:903124008619:web:0af066d3913bc8cee301ee",
  measurementId: "G-NQE638BKPJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')