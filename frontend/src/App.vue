<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <router-view />
    <Footer v-if="!hideFooter" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const hideFooter = computed(() =>
  route.path.startsWith('/signin') || route.path.startsWith('/signup')
)
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>