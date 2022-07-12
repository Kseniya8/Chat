import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../views/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      alias: '/'
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/Chat.vue')
    }
  ]
})

export default router
