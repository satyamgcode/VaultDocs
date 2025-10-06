<script setup>
import HeroImage from '../assets/images/heroImage.png'
</script>

<template>
  <section
    class="flex flex-col gap-24 md:gap-32 md:flex-row items-center pt-12 justify-center px-8 md:px-16 bg-green-50 min-h-[87vh]"
  >
    <!-- Left Content -->
    <div class="space-y-6 text-center md:text-left">
      <h1 class="text-5xl md:text-7xl font-extrabold leading-tight text-green-900">
        Your <span class="text-green-600">Documents</span>,<br />
        Your <span class="text-green-600">Database</span>,<br />
        Your Way.
      </h1>
      <p class="text-gray-600 max-w-lg mx-auto md:mx-0">
        Empower your team with a document management system that adapts to your infrastructure.
        Choose to host on your own database or use our secure cloud solution.
      </p>
      <div class="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
        <RouterLink
          to="/get-started"
          class="px-6 py-3 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
        >
          Get Started
        </RouterLink>
        <RouterLink
          to="/demo"
          class="px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
        >
          View Demo
        </RouterLink>
      </div>
    </div>

    <!-- Right Image + Decorative Shapes -->
    <div class="mt-10 md:mt-0 flex justify-center relative w-[420px] h-[420px] max-w-[90vw] md:max-w-full p-6 md:p-0 overflow-hidden md:overflow-visible">
      <!-- Decorative light green blob (bottom right) -->
      <div
        class="absolute w-[280px] h-[220px] bg-green-200 rounded-full bottom-[-40px] right-[-60px] z-0"
      ></div>

      <!-- Decorative ring (top left) -->
      <div
        class="absolute w-[200px] h-[200px] border-[8px] border-green-700 rounded-full -top-10 -left-10 z-0"
      ></div>

      <!-- Main Image -->
      <img
        :src="HeroImage"
        alt="Hero Image"
        class="relative w-full h-full object-cover rounded-3xl shadow-lg z-10"
      />
    </div>
  </section>
</template>
