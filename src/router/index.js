import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  // linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue'),
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/Student',
      name: 'student',
      component: () => import('../views/student.vue'),
    },
    {
      path: '/Help',
      name: 'help',
      component: () => import('../views/Help.vue'),
    },
  ],
})

export default router
