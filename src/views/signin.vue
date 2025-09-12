<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Alert from '@/components/Alert.vue'

const email = ref('')
const password = ref('')
const errMsg = ref('')
const successMsg = ref('')
const loading = ref(false)
const router = useRouter()

const register = async () => {
  loading.value = true
  if (!email.value || !password.value) {
    errMsg.value = 'Please fill in all fields'
    loading.value = false
    return
  }

  if (password.value.length < 6) {
    errMsg.value = 'Password must be at least 6 characters long'
    loading.value = false
    return
  }

  successMsg.value = 'Creating account...'
  try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    successMsg.value = 'Account created successfully!'
    console.log('Successfully registered!')
    router.push('/feed')
  } catch (error) {
    console.log(error.code)
    switch (error.code) {
      case 'auth/email-already-in-use':
        errMsg.value = 'An account with this email already exists'
        break
      case 'auth/invalid-email':
        errMsg.value = 'Invalid email format'
        break
      case 'auth/weak-password':
        errMsg.value = 'Password is too weak'
        break
      default:
        errMsg.value = 'Registration failed. Please try again'
        break
    }
  } finally {
    loading.value = false
  }
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('Google sign-in successful')
      router.push('/feed')
    })
    .catch((error) => {
      console.error('Google sign-in error:', error)
      errMsg.value = 'Google sign-in failed'
    })
}
</script>
<template>
  <v-container>
    <v-card class="form" elevation="2">
      <form @submit.prevent="register">
        <p class="form-title">Sign in to your account</p>
        <div class="input-container">
          <input placeholder="Enter Your Name" type="text" />
        </div>
        <div class="input-container">
          <input placeholder="Enter email" type="email" v-model="email" required />
        </div>
        <div class="input-container">
          <input placeholder="Enter password" type="password" v-model="password" required />
        </div>
        <v-btn width="300" type="submit" :loading="loading" color="primary">SIGN IN</v-btn>
        <button class="Googlebtn" @click="signInWithGoogle" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          Continue with Google
        </button>

        <p class="signup-link">
          already account?
          <router-link to="/login">login</router-link>
        </p>
      </form>
    </v-card>
    <Alert :message="errMsg" type="error" />
    <Alert :message="successMsg" type="success" />
  </v-container>
</template>
<style scoped>
.form {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-self: center;
  margin-top: 70px;
  padding: 1rem;
  max-width: 350px;
  border-radius: 0.5rem;
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input,
.form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}


.signup-link {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}

.Googlebtn {
  max-width: 340px;
  display: flex;
  padding: 0.5rem 2.8rem;
  font-size: 0.875rem;
  /* line-height: 1.25rem; */
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  gap: 0.75rem;
  color: rgb(65, 63, 63);
  background-color: #fff;
  cursor: pointer;
  transition: all 0.6s ease;
}

.Googlebtn svg {
  height: 24px;
}

.Googlebtn:hover {
  transform: scale(1.02);
}
</style>
