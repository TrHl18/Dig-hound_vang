<template>
  <!-- Título principal del escáner de URLs -->
  <div class="max-w-2xl mx-auto bg-gray-800/90 rounded-xl shadow-2xl p-8 mt-8 border border-cyan-400/30 backdrop-blur-sm">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 mb-2">
        Escáner de URLs con VirusTotal
      </h1>
      <p class="text-cyan-200">Chequea si un enlace es malicioso, phishing o sospechoso</p>
    </div>

    <!-- Input para poner la URL y botón para escanear -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        v-model="url"
        placeholder="https://ejemplo.com"
        class="flex-1 px-4 py-3 bg-gray-900 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-500"
        @keyup.enter="scanUrl"
      />
      <button
        @click="scanUrl"
        :disabled="scanning"
        class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-800 hover:from-cyan-700 hover:to-blue-900 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <span v-if="!scanning">Escanear</span>
        <span v-else class="animate-pulse">Escaneando...</span>
      </button>
    </div>

    <!-- Mensaje de error si algo sale mal -->
    <div v-if="scanError" class="mt-4 text-red-400 text-sm flex items-center gap-1">
      {{ scanError }}
    </div>

    <!-- Panel con el resumen del escaneo de VirusTotal -->
    <div v-if="scanResult" class="bg-blue-950 rounded-xl border border-cyan-400 overflow-hidden mt-8 shadow-lg">
      <div class="p-4 text-base text-cyan-100 space-y-2 bg-blue-900/80">
        <p>
          <strong class="text-cyan-300">URL:</strong>
          <span>{{ url }}</span>
        </p>
        <p>
          <strong class="text-cyan-300">Malicioso:</strong>
          <span class="text-red-400 font-bold">{{ scanResult.attributes?.last_analysis_stats?.malicious ?? '-' }}</span>
        </p>
        <p>
          <strong class="text-cyan-300">Sospechoso:</strong>
          <span>{{ scanResult.attributes?.last_analysis_stats?.suspicious ?? '-' }}</span>
        </p>
        <p>
          <strong class="text-cyan-300">Seguro:</strong>
          <span class="text-green-400 font-bold">{{ scanResult.attributes?.last_analysis_stats?.harmless ?? '-' }}</span>
        </p>
        <p>
          <strong class="text-cyan-300">No detectado:</strong>
          <span>{{ scanResult.attributes?.last_analysis_stats?.undetected ?? '-' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importo lo que necesito de Vue y axios
import { ref } from 'vue'
import axios from 'axios'

const API_BASE = 'http://localhost:4000/api' // Aquí va la ruta de mi backend

// Variables reactivas para la URL, el resultado, el error y el estado de carga
const url = ref('')
const scanResult = ref(null)
const scanError = ref(null)
const scanning = ref(false)

// Función para escanear la URL usando mi backend
async function scanUrl() {
  scanError.value = null
  scanResult.value = null
  scanning.value = true

  try {
    const response = await axios.post(`${API_BASE}/scan-url`, { url: url.value })
    scanResult.value = response.data
  } catch (err) {
    scanError.value = err.response?.data?.error || 'Error al escanear la URL'
  }

  scanning.value = false
}
</script>
