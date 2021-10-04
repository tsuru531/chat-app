import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/pages/SignUp')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/pages/SignIn')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
