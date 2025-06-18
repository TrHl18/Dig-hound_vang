<script setup>
import {
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <section class="py-20 px-8 bg-white">
    <div class="max-w-5xl mx-auto mb-4 flex flex-col items-start">
      <div class="bg-[#2A3568] rounded-lg px-6 py-3 flex items-center justify-center mb-0">
        <h2 class="text-2xl font-bold text-white m-0">Key Features</h2>
      </div>
      <p class="text-gray-800 text-left max-w-2xl mt-4 mb-12 text-lg">
       Digital-Hound te permite analizar IPs y dominios con las principales APIs de inteligencia de amenazas. Rápido, sencillo y respetuoso con tu privacidad
      </p>
    </div>
    <div class="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
      <div
        class="bg-gray-100 rounded-xl py-12 px-8 shadow hover:shadow-2xl hover:bg-blue-100 transition duration-300 flex flex-col items-center"
      >
        <ShieldCheckIcon class="h-14 w-14 text-blue-600 mb-5" />
        <h3 class="font-semibold text-xl mb-3"> Reputación de IP</h3>
        <p class="text-base text-gray-700 text-center">
          Verifica instantáneamente si una IP está marcada por abuso o actividad maliciosa.
        </p>
      </div>
      <div
        class="bg-gray-100 rounded-xl py-12 px-8 shadow hover:shadow-2xl hover:bg-blue-100 transition duration-300 flex flex-col items-center"
      >
        <MagnifyingGlassIcon class="h-14 w-14 text-blue-600 mb-5" />
        <h3 class="font-semibold text-xl mb-3">Búsqueda de Dominio</h3>
        <p class="text-base text-gray-700 text-center">
          Convierte dominios en direcciones IP para un análisis más profundo.
        </p>
      </div>
      <div
        class="bg-gray-100 rounded-xl py-12 px-8 shadow hover:shadow-2xl hover:bg-blue-100 transition duration-300 flex flex-col items-center"
      >
        <PuzzlePieceIcon class="h-14 w-14 text-blue-600 mb-5" />
        <h3 class="font-semibold text-xl mb-3">Integración Multi-API</h3>
        <p class="text-base text-gray-700 text-center">
          Utiliza datos de AbuseIPDB, VirusTotal y más.
        </p>
      </div>
    </div>
  </section>
</template>
