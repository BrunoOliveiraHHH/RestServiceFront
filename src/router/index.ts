import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../views/Acesso.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: mainPage
    }
  ]
})

export default router
