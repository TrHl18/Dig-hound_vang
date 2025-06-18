<template>
  <div class="max-w-4xl mx-auto bg-gray-800/90 rounded-xl shadow-2xl p-8 mt-8 border border-cyan-400/30 backdrop-blur-sm">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 mb-2">
        URL Scanner with urlscan.io
      </h1>
      <p class="text-cyan-200">Check for malware, phishing, and suspicious links</p>
    </div>

    <!-- URL Input -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        v-model="url"
        placeholder="https://example.com"
        class="flex-1 px-4 py-3 bg-gray-900 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-500"
        @keyup.enter="scanUrl"
      />
      <button
        @click="scanUrl"
        :disabled="scanning"
        class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-800 hover:from-cyan-700 hover:to-blue-900 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <span v-if="!scanning">Scan</span>
        <span v-else class="animate-pulse">Scanning...</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </button>
    </div>

    <!-- Error Message -->
    <div v-if="scanError" class="mt-4 text-red-400 text-sm flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {{ scanError }}
    </div>

    <!-- Scan Summary Panel (VirusTotal) -->
    <div v-if="scanResult" class="bg-blue-950 rounded-xl border border-cyan-400 overflow-hidden mt-8 shadow-lg">
      <div class="bg-gradient-to-r from-cyan-700 to-blue-800 p-4 border-b border-cyan-400 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-cyan-800 rounded-lg">
            <svg class="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-cyan-200 text-lg">{{ url }}</h3>
            <p class="text-sm text-cyan-300">VirusTotal Scan</p>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs text-cyan-200 block">Status</span>
          <span class="text-2xl font-bold text-yellow-300">{{ scanResult.attributes?.status || 'N/A' }}</span>
        </div>
      </div>
      <div class="p-4 text-base text-cyan-100 space-y-2 bg-blue-900/80">
        <p>
          <strong class="text-cyan-300">Harmless:</strong>
          <span>{{ scanResult.attributes?.stats?.harmless ?? '-' }}</span>
        </p>
        <p>
          <strong class="text-cyan-300">Malicious:</strong>
          <span class="text-red-400 font-bold">{{ scanResult.attributes?.stats?.malicious ?? '-' }}</span>
        </p>
        <p>
          <strong class="text-cyan-300">Suspicious:</strong>
          <span>{{ scanResult.attributes?.stats?.suspicious ?? '-' }}</span>
        </p>
        <p>
          <strong class="text-cyan-300">Undetected:</strong>
          <span>{{ scanResult.attributes?.stats?.undetected ?? '-' }}</span>
        </p>
      </div>
    </div>

    <!-- History -->
    <div class="mt-10">
      <h2 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14M5 19h14" />
        </svg>
        Your URL Scan History
      </h2>
      <div v-if="loadingHistory" class="text-cyan-400">Loading history...</div>
      <div v-else-if="Array.isArray(history) && history.length === 0" class="text-cyan-400">No scan history found.</div>
      <ul v-else class="divide-y divide-cyan-900/30 rounded-lg bg-blue-900/30">
        <li
          v-for="item in history"
          :key="item._id"
          class="py-4 px-4 flex flex-col sm:flex-row sm:justify-between gap-1 hover:bg-cyan-900/10 transition"
        >yyyyy
          <span class="font-mono text-cyan-300">{{ item.url }}</span>
          <span class="text-cyan-400 text-xs">
            {{ item.createdAt ? new Date(item.createdAt).toLocaleString() : '' }}
          </span>
          <span class="text-sm" :class="{
            'text-red-400': item.data?.verdicts?.overall?.malicious,
            'text-green-400': item.data?.verdicts?.overall && !item.data.verdicts.overall.malicious,
            'text-yellow-400': !item.data?.verdicts?.overall
          }">
            {{ item.data?.verdicts?.overall?.malicious ? 'Malicious' : (item.data?.verdicts?.overall ? 'Not Malicious' : 'Unknown') }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = 'http://localhost:4000/api'

const url = ref('')
const scanResult = ref(null)
const scanError = ref(null)
const scanning = ref(false)

const history = ref([])
const loadingHistory = ref(true)

async function scanUrl() {
  scanError.value = null
  scanResult.value = null
  scanning.value = true

  const token = localStorage.getItem('token')
  if (!token) {
    scanError.value = 'You must be logged in to scan URLs.'
    scanning.value = false
    return
  }

  try {
    const response = await axios.post(`${API_BASE}/scan-url`, { url: url.value }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    scanResult.value = response.data
    fetchHistory()
  } catch (err) {
    scanError.value = err.response?.data?.error || 'Error scanning URL'
  }

  scanning.value = false
}

async function fetchHistory() {
  loadingHistory.value = true
  history.value = []
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const res = await axios.get(`${API_BASE}/url-history`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.value = res.data.data || []
  } catch (err) {
    console.error('History error:', err)
  }

  loadingHistory.value = false
}

onMounted(() => {
  fetchHistory()
})
</script>
