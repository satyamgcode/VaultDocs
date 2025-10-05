<script setup>
import { ref, computed } from "vue";

import LeftIcon from '../assets/icons/left.svg';
import RightIcon from '../assets/icons/right.svg';

// Testimonials Data
const testimonials = ref([
  {
    name: "Sarah K.",
    title: "IT Director",
    company: "TechSolutions Inc.",
    feedback:
      "The ability to use our own database was a game-changer for our compliance team. DocuManage integrated perfectly with our existing infrastructure.",
    initials: "SK",
  },
  {
    name: "Mike P.",
    title: "Operations Manager",
    company: "Creative Assembly",
    feedback:
      "We chose the system database option and were up and running in a single afternoon. The reliability and speed are fantastic.",
    initials: "MP",
  },
  {
    name: "Javier R.",
    title: "Founder",
    company: "Innovate Startups",
    feedback:
      "As a startup, we needed a scalable and secure solution. DocuManage's cloud option was the perfect fit. It's powerful, affordable, and just works.",
    initials: "JR",
  },
  {
    name: "Elara V.",
    title: "Lead Analyst",
    company: "Global Data Corp",
    feedback:
      "The nested folder security features exceeded our expectations. We can manage highly sensitive client data with confidence.",
    initials: "EV",
  },
  {
    name: "David H.",
    title: "Compliance Officer",
    company: "Finance First",
    feedback:
      "Audit trails are clear and comprehensive. This has drastically simplified our quarterly review process and reduced reporting time by 40%.",
    initials: "DH",
  },
]);

const scrollContainer = ref(null);

const cardWidthClass = computed(() => {
  return "w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]";
});

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 300, behavior: "smooth" });
  }
};
</script>


<template>
  <section class="py-16 sm:py-24 px-4 lg:px-8 bg-gradient-to-b from-white to-green-100 relative">
    <!-- Header -->
    <div class="text-center max-w-4xl mx-auto mb-12">
      <h2 class="text-4xl sm:text-5xl font-extrabold text-green-900 tracking-tight mb-4">
        Trusted by Teams Worldwide
      </h2>
      <p class="mt-4 text-lg text-custom-gray-green max-w-2xl mx-auto leading-relaxed">
        Hear what our satisfied customers have to say about the flexibility and power of DocuManage.
      </p>
    </div>

    <!-- Wrapper with buttons -->
    <div class="relative max-w-[1400px] mx-auto px-4 sm:px-12 md:px-16">
      <!-- Left Button -->
      <button
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 bg-green-100 border border-green-400 text-white rounded-full p-3 shadow-md hover:bg-green-400 z-10"
      >
        <img :src="LeftIcon" alt="Left Arrow" class="w-5 h-5" />
      </button>

      <!-- Testimonials Container -->
      <div
        ref="scrollContainer"
        class="flex space-x-6 pb-6 overflow-hidden scroll-smooth"
      >
        <!-- Cards -->
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="flex-shrink-0 p-6 sm:p-8 bg-white border-2 border-custom-mint-medium rounded-xl shadow-lg transition duration-300 hover:shadow-xl"
          :class="cardWidthClass"
        >
          <!-- Profile -->
          <div class="flex items-start mb-4">
            <div
              class="w-12 h-12 bg-custom-mint-medium text-white flex items-center justify-center rounded-full text-lg font-bold mr-4"
            >
              {{ testimonial.initials }}
            </div>
            <div>
              <p class="font-bold text-custom-dark text-lg leading-tight">
                {{ testimonial.name }}
                <span class="text-custom-mint-dark font-medium text-sm block">
                  {{ testimonial.title }}
                </span>
              </p>
              <p class="text-custom-gray-green text-sm">
                {{ testimonial.company }}
              </p>
            </div>
          </div>

          <!-- Feedback -->
          <p class="text-base italic text-custom-gray-green mt-4">
            "{{ testimonial.feedback }}"
          </p>
        </div>
      </div>

      <!-- Right Button -->
      <button
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 bg-green-100 border border-green-400 text-white rounded-full p-3 shadow-md hover:bg-green-400 z-10"
      >
        <img :src="RightIcon" alt="Right Arrow" class="w-5 h-5" />
      </button>
    </div>
  </section>
</template>

<style scoped>

.text-custom-gray-green {
  color: #495e57;
}
.text-custom-dark {
  color: #2b453d;
}
.bg-custom-mint-medium {
  background-color: #a6e4d1;
}
.border-custom-mint-medium {
  border-color: #a6e4d1;
}
</style>
