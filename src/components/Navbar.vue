<template>
  <nav class="bg-green-50 shadow-sm fixed top-0 left-0 right-0 z-50">
    <div class="flex items-center justify-between py-4 px-6 md:px-16">
      
      <div class="flex items-center space-x-2">
        <button
          @click="toggleMenu"
          class="md:hidden focus:outline-none text-green-800"
          aria-label="Toggle menu"
        >
          <img v-if="!isMenuOpen" :src="Hamburger" alt="Hamburger" class="w-7 h-7" />
          <img v-else :src="Close" alt="closeIcon" class="w-7 h-7" />

        </button>

        <div class="w-10 h-10">
          <img src="../assets/icons/logo.svg" alt="Logo" />
        </div>
        <router-link to="/" class="text-xl font-bold text-gray-800">
          VaultDocs
        </router-link>
      </div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-8 text-gray-700 font-medium">
        <li>
          <router-link to="/" class="hover:text-green-600">Features</router-link>
        </li>
        <li>
          <router-link to="/" class="hover:text-green-600">Benefits</router-link>
        </li>
        <li>
          <router-link to="/" class="hover:text-green-600">Testimonials</router-link>
        </li>
      </ul>

      <!-- Right: Actions -->
      <div class="flex items-center space-x-4">
        <router-link
          to="/login"
          class="text-green-800 hover:text-green-900 font-semibold"
        >
          Login
        </router-link>
        <router-link
          to="/demo"
          class="hidden md:inline px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
        >
          Get a Demo
        </router-link>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        @click="closeMenu"
      >
        <div
          class="absolute top-0 left-0 w-64 h-full shadow-lg p-6 flex flex-col justify-between bg-white"
          @click.stop
        >
          <!-- Sidebar Header -->
          <div>
            <div class="flex items-center space-x-2 mb-8">
              <div class="w-9 h-9">
                <img src="../assets/icons/logo.svg" alt="Logo" />
              </div>
              <h2 class="text-lg font-semibold text-gray-800">VaultDocs</h2>
            </div>

            <!-- Menu Links -->
            <ul class="space-y-6 text-gray-700 font-medium">
              <li>
                <router-link
                  to="/"
                  class="block hover:text-green-600"
                  @click="closeMenu"
                  >Features</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="block hover:text-green-600"
                  @click="closeMenu"
                  >Benefits</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="block hover:text-green-600"
                  @click="closeMenu"
                  >Testimonials</router-link
                >
              </li>
            </ul>
          </div>

          <!-- Sidebar Footer -->
          <div class="mt-auto border-t pt-6">
            <router-link
              to="/demo"
              class="w-full block text-center py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
              @click="closeMenu"
            >
              Get a Demo
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import Hamburger from '../assets/icons/hamburger.svg';
import Close from '../assets/icons/crossIcon.svg';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
