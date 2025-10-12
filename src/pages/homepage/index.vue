<script setup>
import Navbar from "../../components/Navbar.vue";
import HeroSection from "../../components/HeroSection.vue";
import DetailPage from "../../components/DetailPage.vue";
import FeaturesPage from "../../components/FeaturesPage.vue";
import FeedbackPage from "../../components/FeedbackPage.vue";
import FreeTrialBanner from "../../components/FreeTrialBanner.vue";
import Footer from "../../components/Footer.vue";
</script>

<template>
  <div class="mt-[70px]">
    <Navbar />
    <HeroSection />
    <DetailPage />
    <FeaturesPage />
    <FeedbackPage />
    <FreeTrialBanner />
    <Footer />
  </div>
</template>
