<template>
  <section class="py-25 px-8 bg-blue-50 flex flex-col md:flex-row items-center">
    <div class="flex-1 mb-8 md:mb-0">
      <h2 class="text-3xl font-bold mb-6">Sobre Digital-Hound</h2>
      <p class="text-gray-700 mb-8 text-lg">
        Digital-Hound es tu herramienta confiable para inteligencia de amenazas rápida y gratuita. 
        Te ayuda a analizar IPs y dominios usando datos de las principales APIs de seguridad como AbuseIPDB y VirusTotal
      </p>
      <ul class="space-y-10">
        <li>
          <div class="flex items-center mb-2">
            <span class="bg-[#2A3568] rounded-lg p-3 mr-4 flex items-center justify-center">
              <BoltIcon class="h-10 w-10 text-white" />
            </span>
            <h3 class="font-semibold text-xl text-gray-900">Rápido & Preciso</h3>
          </div>
          <p class="text-gray-700 ml-16 text-base">Utiliza datos de AbuseIPDB, VirusTotal y más.</p>
        </li>
        <li>
          <div class="flex items-center mb-2">
            <span class="bg-[#2A3568] rounded-lg p-3 mr-4 flex items-center justify-center">
              <EyeIcon class="h-10 w-10 text-white" />
            </span>
            <h3 class="font-semibold text-xl text-gray-900">Analizar Amenazas</h3>
          </div>
          <p class="text-gray-700 ml-16 text-base">Verifica tus preocupaciones sobre IPs, dominios, etc.</p>
        </li>
        <li>
          <div class="flex items-center mb-2">
            <span class="bg-[#2A3568] rounded-lg p-3 mr-4 flex items-center justify-center">
              <GlobeAltIcon class="h-10 w-10 text-white" />
            </span>
            <h3 class="font-semibold text-xl text-gray-900">Abierto & Accesible</h3>
          </div>
          <p class="text-gray-700 ml-16 text-base">Gratis y fácil de usar.</p>
        </li>
      </ul>
    </div>
    <div class="flex-1 flex justify-center items-center">
      <img
        :src="aboutIllustration"
        alt="About illustration"
        class="max-w-2xl w-full"
      />
    </div>
  </section>
</template>

<script setup>
import aboutIllustration from '../assets/img/about-illustration.png'
import { BoltIcon, EyeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
</script>
