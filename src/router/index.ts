import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: () => import('../views/Overview.vue')
    },
    {
      path: '/measure',
      name: 'Measure',
      component: () => import('../views/Measure.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/Settings.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
