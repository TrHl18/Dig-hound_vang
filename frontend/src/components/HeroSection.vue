<template>
  <section
    class="relative min-h-screen flex items-center text-white py-20 px-8 flex-col justify-center text-center"
    :style="`background-image: url('${heroBg}'); background-size: cover; background-position: left center;`"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-blue-900/80 pointer-events-none"></div>
    <div class="relative z-10 w-full flex flex-col items-center">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">
        Digital-Hound:  Inteligencia de Amenazas Rápida y Gratuita
      </h1>
      <p class="mb-8 max-w-2xl">
        Verifica IPs y dominios contra las principales API de seguridad como AbuseIPDB y VirusTotal. Obtén información instantánea.
      </p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition">
        Prueba Digital-Hound Ahora
      </button>
      <div class="mt-10 flex flex-wrap justify-center items-center space-x-6">
        <h2 class="text-2xl font-semibold mb-1">
           Powered by: </h2>
        <img :src="abuseipdb" alt="AbuseIPDB" class="h-8" />
        <img :src="virustotal" alt="VirusTotal" class="h-8" />
        <img :src="hibp" alt="HIBP" class="h-8" />
        <span class="text-xl md:text-xl font-semibold">and more...</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import abuseipdb from '../assets/img/abuseipdb.png'
import virustotal from '../assets/img/virustotal.png'
import hibp from '../assets/img/hibp.png'
import heroBg from '../assets/img/background.jpg'
</script>
