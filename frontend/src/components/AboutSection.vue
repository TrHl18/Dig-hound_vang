<template>
  <section class="py-25 px-8 bg-blue-50 flex flex-col md:flex-row items-center">
    <div class="flex-1 mb-8 md:mb-0">
      <h2 class="text-3xl font-bold mb-6">About Digital-Hound</h2>
      <p class="text-gray-700 mb-8 text-lg">
        Digital-Hound is your go-to tool for fast, free threat intelligence. 
        It helps you analyze IPs and domains using data from leading security APIs like AbuseIPDB and VirusTotal.
      </p>
      <ul class="space-y-10">
        <li>
          <div class="flex items-center mb-2">
            <span class="bg-[#2A3568] rounded-lg p-3 mr-4 flex items-center justify-center">
              <BoltIcon class="h-10 w-10 text-white" />
            </span>
            <h3 class="font-semibold text-xl text-gray-900">Fast & Accurate</h3>
          </div>
          <p class="text-gray-700 ml-16 text-base">Uses data from AbuseIPDB, VirusTotal, and more.</p>
        </li>
        <li>
          <div class="flex items-center mb-2">
            <span class="bg-[#2A3568] rounded-lg p-3 mr-4 flex items-center justify-center">
              <EyeIcon class="h-10 w-10 text-white" />
            </span>
            <h3 class="font-semibold text-xl text-gray-900">Analyze Threats</h3>
          </div>
          <p class="text-gray-700 ml-16 text-base">Check your concerns on IPs, domains, etc.</p>
        </li>
        <li>
          <div class="flex items-center mb-2">
            <span class="bg-[#2A3568] rounded-lg p-3 mr-4 flex items-center justify-center">
              <GlobeAltIcon class="h-10 w-10 text-white" />
            </span>
            <h3 class="font-semibold text-xl text-gray-900">Open & Accessible</h3>
          </div>
          <p class="text-gray-700 ml-16 text-base">Free and easy to use.</p>
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
