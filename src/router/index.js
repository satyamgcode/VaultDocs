import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../pages/homepage/index.vue'
import ErrorView from '../components/Error.vue'  
import LoginPage from '../components/auth/LoginPage.vue'
import RegisterPage from '../components/auth/RegisterPage.vue'
import dms from '../pages/dms.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/dms', name: 'DMS', component: dms },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
