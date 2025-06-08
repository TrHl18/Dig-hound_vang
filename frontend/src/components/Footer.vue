<script setup>
import whiteLogo from '../assets/img/digitalhoundlogo.png'
</script>

<template>
  <footer id="footer" class="bg-gradient-to-br from-gray-900/90 to-blue-900/90 text-white pt-14 pb-8 px-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12">
      <div class="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
        <img :src="whiteLogo" alt="Digital-Hound Logo" class="h-16 w-auto mb-3" />
        <div class="text-lg font-semibold mb-4">"Sniffing out threats, so you don't have to."</div>
        <div class="flex space-x-4">
          <a href="#" aria-label="Twitter" class="hover:text-blue-400">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .388.045.765.127 1.124C7.728 8.89 4.1 6.89 1.671 3.882c-.427.734-.666 1.584-.666 2.491 0 1.72.877 3.234 2.212 4.122a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg>
          </a>
          <a href="#" aria-label="Facebook" class="hover:text-blue-400">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.592 1.324-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="hover:text-blue-400">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
          </a>
        </div>
      </div>
      <div class="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
        <div class="font-bold text-lg mb-3">Other Links</div>
        <ul class="space-y-2 text-gray-200">
          <li><a href="#" class="hover:text-blue-400">About Us</a></li>
          <li><a href="#" class="hover:text-blue-400">Conctact Us</a></li>
          <li><a href="#" class="hover:text-blue-400">Terms and Coditions</a></li>
          <li><a href="#" class="hover:text-blue-400">Privacy Policy</a></li>
        </ul>
      </div>
      <!--Tools-->
      <div class="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
        <div class="font-bold text-lg mb-3">Tools</div>
        <ul class="space-y-2 text-gray-200">
          <li><a href="#" class="hover:text-blue-400">IP Checker</a></li>
          <li><a href="#" class="hover:text-blue-400">Url Safety</a></li>
          <li><a href="#" class="hover:text-blue-400">Coming soon...</a></li>
          <li><a href="#" class="hover:text-blue-400">Coming soon...</a></li>
        </ul>
      </div>
      <!-- Support -->
      <div class="flex-1 flex flex-col items-center md:items-start">
        <div class="font-bold text-lg mb-3">Support</div>
        <div class="text-gray-200 mb-1">+11 2 333 456</div>
        <div class="text-gray-200 mb-1">digitalhoundsupports@example.com</div>
        <div class="text-gray-200">www.digitalhound.com</div>
      </div>
    </div>
  </footer>
    <div class="w-full bg-white mt-10 text-center text-gray-400 text-sm py-4">
      &copy; 2025 Digital-Hound. All rights reserved.
    </div>
</template>