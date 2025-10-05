<script setup>

 import { ref, computed } from "vue";

// Testimonials Data

const FooterListItem = ref([
  {
    title: "Term of Services |",
    links: '',
  },
  {
    title: "Privacy Policy |",
    links: '',
  },
  {
    title: "Contact Us |",
    links: '' ,
  },
  {
    title: "Feedback",
    links: '',
  },
]);

</script>

<template>
    <section
      class="py-4 sm:py-8 xl:py-10 px-4 lg:px-8 bg-green-100"
    >
      <div class="w-full  flex justify-between">
        <ul class="flex gap-3">
        <li v-for="item in FooterListItem" :key="item.title">
          <h4 class="font-medium text-green-900 text-sm cursor-pointer">{{ item.title }}</h4>
          <ul>
            <li v-for="link in item.links" :key="link">
              <a href="#" class="text-sm text-gray-600 hover:underline">{{ link }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div>
        <p class="text-sm text-green-800 mt-4">&copy; 2024 - {{ new Date().getFullYear() }} VaultDocs. All rights reserved.</p>
      </div>
      </div>
    </section>
</template>