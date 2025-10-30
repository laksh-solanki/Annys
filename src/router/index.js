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
      path: '/project',
      name: 'project',
      component: () => import('../views/Project.vue'),
    },
    {
      path: '/Help',
      name: 'help',
      component: () => import('../views/Help.vue'),
    },
    {
      path: '/student_detail',
      name: 'student_detail',
      component: () => import('../views/student_detail.vue'),
    },
    {
      path: '/student-data',
      name: 'student-data',
      component: () => import('../views/StudentData.vue'),
    }
  ],
})

export default router
