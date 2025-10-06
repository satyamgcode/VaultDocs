<template>
    <Registerpage :formType="'Login'">

        <template #formName>
            <div class="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
                <form @submit.prevent="loginUser">
                    <!-- Email -->
                    <div class="mb-6">
                        <label class="block text-green-700 text-sm font-bold mb-2" for="email">Email Address</label>
                        <input type="email" id="email" v-model="form.email"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline required text-sm"
                            placeholder="Enter your email" required />
                    </div>

                    <!-- Password -->
                    <div class="mb-6">
                        <label class="block text-green-700 text-sm font-bold mb-2" for="password">Password</label>
                        <input type="password" id="password" v-model="form.password"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                            placeholder="Enter your password" required />
                    </div>

                    <!-- Submit Button -->
                    <div class="flex items-center justify-between">
                        <button type="submit"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Login
                        </button>
                        <p class="text-red-500"><router-link>forgot password</router-link></p>
                    </div>

                    <div class="flex items-center justify-between">
                        <p class="text-green-700 text-sm mt-4">Don't have an account? </p>
                        <router-link to="/register" class="text-green-800">Register</router-link>
                    </div>
                </form>
            </div>
        </template>
    </Registerpage>
</template>

<script setup>
import { reactive } from 'vue';
import Registerpage from '../auth/RegisterPage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
    email: '',
    password: ''
});

const loginUser = () => {
    if (!form.email || !form.password) {
        alert('Please fill in all fields!');
        return;
    }
    console.log('Login successful!');
    router.push('/dms');
};
</script>