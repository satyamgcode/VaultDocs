<script setup>
import { ref } from "vue";

// Footer Links Data
const FooterListItem = ref([
  {
    title: "Terms of Services",
    links: [],
  },
  {
    title: "Privacy Policy",
    links: [],
  },
  {
    title: "Contact Us ",
    links: [] ,
  },
  {
    title: "Feedback",
    links: [],
  },
]);
</script>

<template>
  <section class="py-6 sm:py-10 px-4 lg:px-8 bg-green-100">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-0">
      <!-- Footer Links -->
      <ul class="flex flex-wrap flex-col gap-1 text-center sm:text-left sm:flex-row sm:gap-3 ">
        <li v-for="item in FooterListItem" :key="item.title" class="flex flex-col sm:flex-row sm:items-center gap-1">
          <h4 class="font-medium text-green-900 text-sm cursor-pointer">{{ item.title }}</h4>
          <ul class="flex flex-wrap gap-2">
            <li v-for="link in item.links" :key="link">
              <a href="#" class="text-sm text-gray-600 hover:underline">{{ link }}</a>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Copyright -->
      <div class="mt-4 sm:mt-0">
        <p class="text-sm text-green-800">&copy; 2024 - {{ new Date().getFullYear() }} VaultDocs. All rights reserved.</p>
      </div>
    </div>
  </section>
</template>
