<template>
  <main>
    <section id="hero" class="scroll-mt-24"><HeroSection /></section>
    <section id="features" class="scroll-mt-24"><FeaturesSection /></section>
    <section id="about" class="scroll-mt-24"><AboutSection /></section>
    <IPCheck />
  </main>
</template>

<script setup>
import HeroSection from './HeroSection.vue'
import FeaturesSection from './FeaturesSection.vue'
import AboutSection from './AboutSection.vue'
</script>