<template>
  <nav class="flex items-center justify-between py-6 px-8 md:px-16 bg-green-50">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <div class="w-10 h-10">
        <img src="../assets/icons/logo.svg" alt="Logo" />
      </div>
      <router-link to="/" class="text-xl font-bold text-gray-800">VaultDocs</router-link>
    </div>

    <!-- Desktop Menu -->
    <ul class="hidden md:flex space-x-8 text-gray-600 font-medium">
      <li><router-link to="/" class="hover:text-green-600">Features</router-link></li>
      <li><router-link to="/" class="hover:text-green-600">Benefits</router-link></li>
      <li><router-link to="/" class="hover:text-green-600">Testimonials</router-link></li>
    </ul>

    <!-- Actions -->
    <div class="hidden md:flex items-center space-x-4">
      <router-link to="/login" class="text-green-800 hover:text-green-900 font-semibold">
        Login
      </router-link>
      <router-link
        to="/demo"
        class="px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
      >
        Get a Demo
      </router-link>
    </div>
  </nav>
</template>
