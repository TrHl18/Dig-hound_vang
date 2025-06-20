<template>
  <div
    class="min-h-screen flex items-center justify-center relative"
    :style="`background: url('${signBg}') center center / cover no-repeat;`"
  >
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    <div class="relative bg-white bg-opacity-90 rounded-xl p-8 w-full max-w-md shadow-lg border border-blue-100">
      
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        {{ isSignUp ? 'Create an Account' : 'Welcome Back' }}
      </h2>

>
      <div v-if="success" class="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
        {{ success }}
      </div>
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            v-model="email"
            required
            placeholder="your@email.com"
            class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            v-model="password"
            required
            :placeholder="isSignUp ? 'Minimum 8 characters' : 'Your password'"
            minlength="8"
            class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="isSignUp" class="text-xs text-gray-500 mt-1">
            Use a strong password with letters, numbers, and symbols
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2"
        >
          <span v-if="!isLoading">
            {{ isSignUp ? 'Sign Up' : 'Sign In' }}
          </span>
          <svg
            v-if="isLoading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </form>

      <p class="text-center text-sm mt-4 text-gray-600">
        {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
        <button
          @click="toggleAuthMode"
          class="text-blue-600 hover:underline ml-1 font-medium"
        >
          {{ isSignUp ? 'Sign In' : 'Sign Up' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { authState } from '../authBus.js';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import signBg from '../assets/img/signbg.jpg'

const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const isLoading = ref(false)
const error = ref(null)
const success = ref(null)

onMounted(() => {
  isSignUp.value = route.query.mode === 'signup'
})

const toggleAuthMode = () => {
  isSignUp.value = !isSignUp.value
  error.value = null
  router.replace({ path: '/signin', query: { mode: isSignUp.value ? 'signup' : 'signin' } })
}

async function handleSubmit() {
  error.value = null
  success.value = null
  isLoading.value = true

  try {
    if (!email.value || !password.value) {
      throw new Error('Please fill in all fields')
    }
    if (isSignUp.value && password.value.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }

    const response = await authenticateUser(email.value, password.value)
    console.log('Authentication successful:', response)

    if (isSignUp.value) {
      isSignUp.value = false
      router.replace({ path: '/signin', query: { mode: 'signin' } })
      success.value = 'Account created! You can now sign in.'
      password.value = ''
    } else {
      if (response.token) {
        localStorage.setItem('token', response.token)
        authState.token = response.token
      }
      success.value = '¡Inicio de sesión exitoso!'
      router.push({ path: '/landing' })
    }
  } catch (err) {
    error.value = err.message || 'Authentication failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

async function authenticateUser(email, password) {
  const url = isSignUp.value
    ? 'http://localhost:4000/api/auth/signup'
    : 'http://localhost:4000/api/auth/signin'
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Authentication failed')
  }
  return data
}
</script>