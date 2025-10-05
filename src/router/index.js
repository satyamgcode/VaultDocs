import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../pages/homepage/index.vue'
import ErrorView from '../components/Error.vue'  // import your error page

const routes = [
  { path: '/', component: HomeView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
