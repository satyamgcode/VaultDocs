<script setup>
import { reactive } from 'vue';
import Navbar from '../common/Header.vue';
import RegisterImg from '../../assets/images/authImage.png';

const props = defineProps({
  formType: {
    type: String,
    default: 'Register'
  }
})

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const registerEmployee = () => {
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  alert('Employee registered successfully!');
};
</script>

<template>
  <div class="min-h-screen bg-green-50 relative flex flex-col">
    <!-- Navbar at the top -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <Navbar :showNavItems="false" :buttonName="'Become a Member'" />
    </div>

    <!-- Main content starts here -->
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-around max-w-screen-xl mx-auto pt-28 px-4 lg:px-8">
      
      <!-- Left Section -->
      <div class="text-center lg:text-left w-full lg:w-1/2">
        <h1 class="text-green-700 text-5xl md:text-6xl lg:text-7xl font-bold">VaultDocs</h1>
        <p class="pt-2 text-green-800 font-medium text-sm md:text-base lg:text-base text-right">
          Safe, Simple, Smart Document Management.
        </p>
        <img 
          :src="RegisterImg" 
          class="w-72 sm:w-96 lg:w-[400px] rounded-[30px] md:rounded-[40px] lg:rounded-[50px] mt-8 md:mt-12 mx-auto lg:mx-0 hidden lg:block" 
          alt="Register Image" 
        >
      </div>

      <!-- Right Section (Form) -->
      <div class="w-full max-w-md lg:w-1/2 mb-16 lg:mb-0">
        <h1 class="text-green-700 text-lg md:text-xl font-bold text-center mb-4">
          {{ formType }}
        </h1>
        <slot name="formName">
          <div class="bg-white shadow-md rounded-lg p-6 md:p-8">
            <form @submit.prevent="registerEmployee">
              
              <!-- Full Name -->
              <div class="mb-4 md:mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline text-sm" 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>

              <!-- Email -->
              <div class="mb-4 md:mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline text-sm" 
                  placeholder="Enter your email" 
                  required 
                />
              </div>

              <!-- Password -->
              <div class="mb-4 md:mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="form.password" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline text-sm" 
                  placeholder="Enter a secure password" 
                  required 
                />
              </div>

              <!-- Confirm Password -->
              <div class="mb-4 md:mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  v-model="form.confirmPassword" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline text-sm" 
                  placeholder="Re-enter your password" 
                  required 
                />
              </div>

              <!-- Submit + Links -->
              <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center">
                  <button 
                    type="submit" 
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </button>
                  <router-link to="/forgot-password" class="text-red-500 text-sm hover:underline">Forgot password?</router-link>
                </div>

                <div class="flex justify-center gap-2 text-sm md:text-base">
                  <p>Already have an account?</p>
                  <router-link to="/login" class="text-green-800 hover:underline">Login</router-link>
                </div>
              </div>
            </form>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
