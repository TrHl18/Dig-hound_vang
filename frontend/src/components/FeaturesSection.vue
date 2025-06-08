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
        Digital-Hound lets you analyze IPs and domains with leading threat intelligence APIs. Fast, easy, and privacy-friendly.
      </p>
    </div>
    <div class="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
      <div
        class="bg-gray-100 rounded-xl py-12 px-8 shadow hover:shadow-2xl hover:bg-blue-100 transition duration-300 flex flex-col items-center"
      >
        <ShieldCheckIcon class="h-14 w-14 text-blue-600 mb-5" />
        <h3 class="font-semibold text-xl mb-3">IP Reputation</h3>
        <p class="text-base text-gray-700 text-center">
          Instantly check if an IP is flagged for abuse or malicious activity.
        </p>
      </div>
      <div
        class="bg-gray-100 rounded-xl py-12 px-8 shadow hover:shadow-2xl hover:bg-blue-100 transition duration-300 flex flex-col items-center"
      >
        <MagnifyingGlassIcon class="h-14 w-14 text-blue-600 mb-5" />
        <h3 class="font-semibold text-xl mb-3">Domain Lookup</h3>
        <p class="text-base text-gray-700 text-center">
          Convert domains to IP addresses for deeper analysis.
        </p>
      </div>
      <div
        class="bg-gray-100 rounded-xl py-12 px-8 shadow hover:shadow-2xl hover:bg-blue-100 transition duration-300 flex flex-col items-center"
      >
        <PuzzlePieceIcon class="h-14 w-14 text-blue-600 mb-5" />
        <h3 class="font-semibold text-xl mb-3">Multi-API Integration</h3>
        <p class="text-base text-gray-700 text-center">
          Uses data from AbuseIPDB, VirusTotal, and more.
        </p>
      </div>
    </div>
  </section>
</template>
