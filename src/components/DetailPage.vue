<script setup>

import DatabaseImg from '../assets/icons/database.svg'
import CheckImg from '../assets/icons/check.svg'
import CloudImg from '../assets/icons/cloud.svg'

const ownDatabasePoints = [
  {
    title: "Total Data Sovereignty",
    description:
      "Keep your sensitive documents within your own network and security perimeter.",
  },
  {
    title: "Compliance & Governance",
    description:
      "Meet strict regulatory requirements by managing data on your own terms.",
  },
  {
    title: "Leverage Existing Infrastructure",
    description:
      "Utilize your current database investments and IT expertise.",
  },
];

const cloudPoints = [
  {
    title: "Rapid Deployment",
    description:
      "Get up and running in minutes without any infrastructure setup.",
  },
  {
    title: "Scalability on Demand",
    description:
      "Our cloud infrastructure grows with your business needs automatically.",
  },
  {
    title: "Worry-Free Maintenance",
    description:
      "We manage all updates, backups, and security protocols for you.",
  },
];



</script>

<template>
  <section class="bg-white py-16 px-4 md:px-8 lg:px-20">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-green-900 mb-4">
        The Freedom to Choose Your Foundation
      </h2>
      <p class="text-gray-600 max-w-3xl mx-auto mb-12">
        DocuManage is built for flexibility. Whether you need total data sovereignty or the convenience of a managed service, we have you covered.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Use Your Own Database -->
        <div
          class="rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-200 p-8 text-left bg-white"
        >
          <div class="flex items-center mb-6">
            <div class="bg-green-50 p-3 rounded-xl">
              <img :src="DatabaseImg" alt="database icon" class="w-8 h-8 text-green-900" />
            </div>
            <h3 class="text-xl font-semibold text-green-900 ml-4">
              Use Your Own Database
            </h3>
          </div>

          <ul class="space-y-4 text-gray-600">
            <li
              v-for="(point, idx) in ownDatabasePoints"
              :key="idx"
              class="flex items-start"
            >
              <img :src="CheckImg" alt="check icon" class="w-5 h-5 text-green-900 mt-1 mr-3 flex-shrink-0" />
              <p>
                <strong>{{ point.title }}:</strong> {{ point.description }}
              </p>
            </li>
          </ul>
        </div>

        <!-- Use Our Secure Cloud -->
        <div
          class="rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-200 p-8 text-left bg-white"
        >
          <div class="flex items-center mb-6">
            <div class="bg-green-50 p-3 rounded-xl">
              <img :src="CloudImg" alt="cloud icon" class="w-8 h-8 text-green-900" />
            </div>
            <h3 class="text-xl font-semibold text-green-900 ml-4">
              Use Our Secure Cloud
            </h3>
          </div>

          <ul class="space-y-4 text-gray-600">
            <li
              v-for="(point, idx) in cloudPoints"
              :key="idx"
              class="flex items-start"
            >
              <img :src="CheckImg" alt="check icon" class="w-5 h-5 text-green-900 mt-1 mr-3 flex-shrink-0" />
              <p>
                <strong>{{ point.title }}:</strong> {{ point.description }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
div[class*="rounded-2xl"]:hover {
  transform: translateY(-2px);
}
</style>
