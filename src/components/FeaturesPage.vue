<template>
  <section class="light-bg py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-20">
      <h2 class="text-4xl sm:text-5xl font-extrabold primary-text tracking-tight mb-4">
        Features That Drive Efficiency
      </h2>
      <p class="mt-4 text-base sm:text-lg md:text-xl secondary-text max-w-2xl mx-auto leading-relaxed">
        DocuManage is more than just storage; it's a powerful tool to streamline your entire document lifecycle, ensuring security and accessibility for your nested structures.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 gap-x-8 gap-y-3 sm:gap-y-8 md:gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="flex flex-col items-center text-center p-6 rounded-xl transition duration-300 hover:shadow-2xl hover:scale-[1.02] bg-white shadow-lg"
      >
        <!-- Icon -->
        <div class="primary-icon-bg w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-md">
          <div v-html="feature.svgCode" class="w-8 h-8 text-white"></div>
        </div>

        <!-- Title -->
        <h3 class="text-xl font-bold primary-text mb-3">
          {{ feature.title }}
        </h3>

        <!-- Description -->
        <p class="secondary-text text-xs sm:text-sm leading-relaxed">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Custom SVG placeholders
const svgPlaceholders = {
  grid: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.636 2.364a9 9 0 010 12.728l-2.364-2.364a7 7 0 000-9.9l2.364-2.364zM4.364 4.364a9 9 0 0112.728 0l-2.364 2.364a7 7 0 00-9.9 0L4.364 4.364z"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2c0-.523-.086-1.03-.203-1.5M4 14v6m4-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2m8-2v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
  integration: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7z"/></svg>`,
  audit: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m-6 4h6m-3-12a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H9z"/></svg>`
}

const features = ref([
  {
    title: 'Intuitive Interface',
    description:
      'Effortlessly upload, organize, search, and manage your documents with a clean and user-friendly design optimized for secure, nested folder views.',
    svgCode: svgPlaceholders.grid
  },
  {
    title: 'Robust Security',
    description:
      'End-to-end encryption, regular security audits, and role-based access ensure your data is always protected across all file and folder levels.',
    svgCode: svgPlaceholders.shield
  },
  {
    title: 'Collaborative Workflows',
    description:
      'Share documents, manage versions, and track changes with your team in real-time, even within deeply nested structures, enhancing productivity.',
    svgCode: svgPlaceholders.users
  },
  {
    title: 'Advanced Search',
    description:
      'Find the exact document you need in seconds with powerful, content-aware search capabilities that can scan through complex, nested file paths.',
    svgCode: svgPlaceholders.search
  },
  {
    title: 'Seamless Integration',
    description:
      'Connect DocuManage with your favorite apps through our robust API and pre-built integrations to fit your existing tech stack.',
    svgCode: svgPlaceholders.integration
  },
  {
    title: 'Audit Trails',
    description:
      'Maintain a complete history of all document activity, including access, edits, and moves, ensuring accountability and compliance across all files.',
    svgCode: svgPlaceholders.audit
  }
])
</script>

<style scoped>
.primary-text {
  color: #0f5132;
}
.primary-icon-bg {
  background-color: #a6e4d1;
}
.light-bg {
  background-color: #f0faf5;
}
.secondary-text {
  color: #495e57;
}
</style>
