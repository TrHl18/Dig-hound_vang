<script setup>
import whiteLogo from "../assets/img/digitalhoundlogo.png";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { UserIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline";
import { authState } from '../authBus.js';

const showDropdown = ref(false);
const router = useRouter();
const route = useRoute();

const hideHeader = computed(() => route.path.startsWith('/signin'));
const isAuthenticated = computed(() => !!authState.token);

const userEmail = computed(() => {
  if (!authState.token) return null;
  try {
    const payload = JSON.parse(atob(authState.token.split('.')[1]));
    return payload.email;
  } catch {
    return null;
  }
});

function signOut() {
  localStorage.removeItem('token');
  authState.token = null;
  router.push('/signin');
}

// Sincronización si el token cambia en otra pestaña
window.addEventListener('storage', (event) => {
  if (event.key === 'token') {
    authState.token = event.newValue;
  }
});
</script>

<template>
  <header v-if="!hideHeader">
    <nav
      class="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-gray-900/100 to-blue-900/100 text-white py-3 px-8 flex items-center shadow"
    >
      <img
        :src="whiteLogo"
        alt="Digital-Hound Logo"
        class="h-16 w-auto mr-12"
      />

      <ul class="flex space-x-8 relative ml-auto mr-[10%]">
        <li>
          <router-link
            :to="{ path: '/landing', hash: '#hero' }"
            class="hover:text-blue-400 transition-colors"
            >Inicio</router-link>
        </li>
        <li>
          <router-link
            :to="{ path: '/landing', hash: '#features' }"
            class="hover:text-blue-400 transition-colors"
            >Funciones</router-link>
        </li>
        <li>
          <router-link
            :to="{ path: '/landing', hash: '#about' }"
            class="hover:text-blue-400 transition-colors"
            >Sobre Nosotros</router-link>
        </li>
        <li>
          <router-link
            :to="{ path: '/landing', hash: '#footer' }"
            class="hover:text-blue-400 transition-colors"
            >Contacto</router-link>
        </li>

        <!-- Herramientas -->
        <li
          class="relative"
          @mouseenter="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <button
            class="flex items-center hover:text-blue-400 focus:outline-none transition-colors"
          >
            Tools
            <svg
              class="ml-1 h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': showDropdown }"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <ul
              v-if="showDropdown"
              class="absolute left-0 top-full mt-2 bg-gray-900 text-white rounded shadow-lg min-w-[160px] overflow-hidden border border-gray-700"
            >
              <li>
                <router-link
                  to="/ipcheck"
                  class="block px-4 py-2 hover:bg-blue-800 transition-colors"
                >
                  IP Checker
                </router-link>
              </li>
              <li>
                <router-link
                  to="/urlscanner"
                  class="block px-4 py-2 hover:bg-blue-800 transition-colors"
                >
                  URL Scanner
                </router-link>
              </li>
            </ul>
          </transition>
        </li>

        <!-- Autenticación -->
        <li v-if="!isAuthenticated">
          <router-link
            to="/signin?mode=signin"
            class="flex items-center gap-1 hover:text-blue-400 transition-colors"
          >
            <UserIcon class="h-5 w-5" />
            Sign In
          </router-link>
        </li>
        <li v-else class="flex items-center gap-2">
          <span class="text-sm text-blue-200 font-semibold" v-if="userEmail">{{ userEmail }}</span>
          <button
            @click="signOut"
            class="flex items-center gap-1 hover:text-blue-400 transition-colors"
            title="Sign Out"
          >
            <ArrowLeftOnRectangleIcon class="h-5 w-5" />
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
    <div class="h-18"></div>
  </header>
</template>