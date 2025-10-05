<script setup>
import PageNotFoundImage from '../assets/images/PageNotFound.png'
</script>

<template>
  <div class="min-h-screen bg-green-50 relative">

    <nav class="absolute top-0 left-0 w-full flex items-center py-4 px-6 md:px-16 bg-green-50 z-10">
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10">
          <img src="../assets/icons/logo.svg" alt="Logo" class="w-full h-full object-contain" />
        </div>
        <a href="/" class="text-xl font-bold text-gray-800">VaultDocs</a>
      </div>
    </nav>

    <section class="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div class="w-40 h-40 sm:w-60 sm:h-60 mb-6 mt-16">
        <img :src="PageNotFoundImage" alt="Not Found" class="w-full h-full object-contain rounded-full" />
      </div>

      <h1 class="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
        Oops! Page not found.
      </h1>

      <p class="text-gray-600 text-sm sm:text-base mb-6 max-w-md">
        The page you're looking for doesn't seem to exist. It might have been moved, deleted, or you might have mistyped the URL.
      </p>

      <a href="/" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition">
        Return to Homepage
      </a>
    </section>
    
  </div>
</template>

<style scoped>
img {
  transition: transform 0.3s ease;
}
img:hover {
  transform: scale(1.05);
}
</style>
