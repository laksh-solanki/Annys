import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const auth = getAuth()

  // Listen to auth state changes
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = {
        email: firebaseUser.email,
        username: firebaseUser.email.split('@')[0],
        initials: firebaseUser.email[0].toUpperCase()
      }
    } else {
      user.value = null
    }
  })

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      user.value = null
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return {
    user,
    signOut
  }
})
