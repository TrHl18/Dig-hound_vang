<template>
  <div class="max-w-4xl mx-auto bg-gray-800/90 rounded-xl shadow-2xl p-8 mt-8 border border-blue-400/30 backdrop-blur-sm">
    <!-- Main Title -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
        Digital Hound IP Intelligence
      </h1>
      <p class="text-gray-400">Comprehensive IP reputation and threat analysis</p>
    </div>

    <!-- Dual Input Sections -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <!-- Domain Resolution -->
      <div class="bg-gray-900/50 p-6 rounded-lg border border-blue-900/50">
        <h2 class="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656[...]"/>
          </svg>
          Domain Resolution
        </h2>
        <div class="flex flex-col sm:flex-row gap-3">
          <input 
            v-model="domain" 
            placeholder="example.com"
            class="flex-1 px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-500"
            @keyup.enter="resolveDomain"
          />
          <button 
            @click="resolveDomain"
            :disabled="resolving"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span v-if="!resolving">Resolve</span>
            <span v-else class="animate-pulse">Resolving...</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </button>
        </div>
        
        <!-- Resolved IPs -->
        <div v-if="resolvedIPs.length" class="mt-4 space-y-2">
          <div class="text-sm text-gray-400 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.[...]"/>
            </svg>
            Resolved IP Addresses
          </div>
          <div class="bg-gray-800/60 rounded-lg p-3 space-y-2">
            <div v-for="ip in resolvedIPs" :key="ip" class="flex items-center justify-between group">
              <span class="font-mono text-blue-300">{{ ip }}</span>
              <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click="ipToCheck = ip"
                  class="p-1 text-xs bg-blue-900/50 hover:bg-blue-800 rounded transition-colors"
                >
                  Check
                </button>
                <button 
                  @click="copyToClipboard(ip)"
                  class="p-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="resolveError" class="mt-3 text-red-400 text-sm flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ resolveError }}
        </div>
      </div>

      <!-- IP Checker -->
      <div class="bg-gray-900/50 p-6 rounded-lg border border-blue-900/50">
        <h2 class="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002[...]"/>
          </svg>
          IP Threat Analysis
        </h2>
        <div class="flex flex-col sm:flex-row gap-3">
          <input 
            v-model="ipToCheck" 
            placeholder="8.8.8.8"
            class="flex-1 px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-500"
            @keyup.enter="checkIP"
          />
          <button 
            @click="checkIP"
            :disabled="checking"
            class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-800 hover:from-cyan-700 hover:to-blue-900 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span v-if="!checking">Analyze</span>
            <span v-else class="animate-pulse">Analyzing...</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </button>
        </div>
        
        <!-- Analysis Results -->
        <div v-if="abuseError" class="mt-3 text-red-400 text-sm flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ abuseError }}
        </div>
      </div>
    </div>

    <!-- Results Panel -->
    <div v-if="abuseResult" class="bg-gray-900 rounded-xl border border-blue-900/50 overflow-hidden">
      <!-- Result Header -->
      <div class="bg-gradient-to-r from-blue-900/50 to-blue-900/20 p-4 border-b border-blue-900/50 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-900/30 rounded-lg">
            <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 0[...]" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-white">{{ abuseResult.data.ipAddress }}</h3>
            <p class="text-sm text-blue-300">{{ abuseResult.data.domain || 'No domain associated' }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-right">
            <span class="text-xs text-gray-400 block">Abuse Score</span>
            <span class="font-bold" :class="{
              'text-green-400': abuseResult.data.abuseConfidenceScore < 30,
              'text-yellow-400': abuseResult.data.abuseConfidenceScore >= 30 && abuseResult.data.abuseConfidenceScore < 70,
              'text-red-400': abuseResult.data.abuseConfidenceScore >= 70
            }">
              {{ abuseResult.data.abuseConfidenceScore }}%
            </span>
          </div>
          <div class="h-8 w-px bg-blue-900/50 mx-2"></div>
          <div class="text-right">
            <span class="text-xs text-gray-400 block">Reports</span>
            <span class="font-bold text-white">{{ abuseResult.data.totalReports }}</span>
          </div>
        </div>
      </div>
      
      <!-- Detailed Results -->
      <div class="grid md:grid-cols-2 gap-6 p-6">
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-semibold text-gray-400 mb-1">NETWORK INFORMATION</h4>
            <div class="bg-gray-800/50 rounded-lg p-4 space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400">ISP</span>
                <span class="font-mono text-right">{{ abuseResult.data.isp || 'Unknown' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Usage Type</span>
                <span class="font-mono text-right">{{ abuseResult.data.usageType || 'Unknown' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Hostnames</span>
                <span class="font-mono text-right">{{ (abuseResult.data.hostnames && abuseResult.data.hostnames.length) ? abuseResult.data.hostnames[0] : (abuseResult.data.domain || 'No domain associated') }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-semibold text-gray-400 mb-1">GEOGRAPHIC DATA</h4>
            <div class="bg-gray-800/50 rounded-lg p-4 space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400">Country</span>
                <span class="font-mono text-right">{{ abuseResult.data.country || 'Unknown' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Region</span>
                <span class="font-mono text-right">{{ abuseResult.data.region || 'Unknown' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">City</span>
                <span class="font-mono text-right">{{ abuseResult.data.city || 'Unknown' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="abuseResult.data.lastReportedAt" class="p-4 text-xs text-gray-400 border-t border-blue-900/50">
        Last reported at: {{ abuseResult.data.lastReportedAt }}
      </div>
    </div>
  </div>

  <!-- User's IP Analysis History -->
<div class="mt-12">
  <h2 class="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    Your IP Analysis History
  </h2>
  <div v-if="loadingHistory" class="text-gray-400">Loading history...</div>
  <div v-else-if="historyError" class="text-red-400">{{ historyError }}</div>
  <div v-else-if="!history.length" class="text-gray-400">No history yet.</div>
  <ul v-else class="divide-y divide-blue-900/30 rounded-lg bg-gray-900/30">
    <li
      v-for="item in history"
      :key="item._id"
      class="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-1 px-4 hover:bg-blue-900/10 transition"
    >
      <span class="font-mono text-blue-300 text-lg">{{ item.ip }}</span>
      <span class="text-gray-400 text-xs">
        {{ new Date(item.createdAt).toLocaleString() }}
      </span>
      <span class="text-gray-500 text-xs">
        {{ item.geo?.country ?? 'Unknown' }}{{ item.geo?.city ? ', ' + item.geo.city : '' }}
      </span>
      <span class="text-gray-500 text-xs">
        Abuse score: <span :class="{
          'text-green-400': (item.abuse?.abuseConfidenceScore ?? 0) < 30,
          'text-yellow-400': (item.abuse?.abuseConfidenceScore ?? 0) >= 30 && (item.abuse?.abuseConfidenceScore ?? 0) < 70,
          'text-red-400': (item.abuse?.abuseConfidenceScore ?? 0) >= 70
        }">
          {{ item.abuse?.abuseConfidenceScore ?? 'N/A' }}
        </span>
      </span>
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue';

const API_BASE = 'http://localhost:4000/api' // Cambia si tu backend está en otro puerto o ruta

// Reactive state
const history = ref([])
const loadingHistory = ref(false)
const historyError = ref(null)
const domain = ref('')
const resolvedIPs = ref([])
const resolveError = ref(null)
const resolving = ref(false)

const ipToCheck = ref('')
const abuseResult = ref(null)
const abuseError = ref(null)
const checking = ref(false)

async function fetchHistory() {
  historyError.value = null;
  loadingHistory.value = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('You must be logged in to view your history.');
    const res = await fetch(`${API_BASE}/history`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error fetching history');
    history.value = data.history;
  } catch (err) {
    historyError.value = err.message;
  } finally {
    loadingHistory.value = false;
  }
}

async function resolveDomain() {
  resolveError.value = null
  resolvedIPs.value = []
  resolving.value = true

  if (!domain.value.trim()) {
    resolveError.value = 'Please enter a domain name'
    resolving.value = false
    return
  }
  try {
    const response = await axios.get(`${API_BASE}/resolve/${domain.value.trim()}`)
    resolvedIPs.value = response.data.ips || []
    if (resolvedIPs.value.length) {
      ipToCheck.value = resolvedIPs.value[0]
    } else {
      resolveError.value = 'No IPs found for this domain'
    }
  } catch (err) {
    console.error('Error al resolver dominio:', err)
    if (err.response && err.response.data) {
      resolveError.value = `${err.response.data.error} (${err.response.data.details})`
    } else {
      resolveError.value = err.message || 'Error resolving domain'
    }
  }
  resolving.value = false
}

async function checkIP() {
  abuseError.value = null
  abuseResult.value = null
  checking.value = true

  if (!ipToCheck.value.trim()) {
    abuseError.value = 'Please enter an IP address'
    checking.value = false
    return
  }
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      abuseError.value = "You must be logged in to analyze an IP";
      checking.value = false;
      return;
    }
    const response = await axios.post(`${API_BASE}/check-ip`, { ip: ipToCheck.value.trim() }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    abuseResult.value = response.data;
    fetchHistory(); // Actualiza historial tras analizar
  } catch (err) {
    abuseError.value = err.response?.data?.error || 'Error analyzing IP';
  }
  checking.value = false
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
  // Puedes agregar notificación visual aquí si lo deseas
}

onMounted(() => {
  fetchHistory();
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #1e293b;
}
::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}
</style>