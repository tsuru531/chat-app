import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'

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
    component: () => import('@/pages/Dashboard'),
    meta: { requiresAuth: true }
  },
  {
    path: '/thread/post',
    name: 'CreateThread',
    component: () => import('@/pages/CreateThread'),
    meta: { requiresAuth: true }
  },
  {
    path: '/thread/:thread_id',
    name: 'ChatBoard',
    component: () => import('@/pages/ChatBoard')
  },
  {
    path: '/thread/:thread_id/menu',
    name: 'ThreadMenu',
    component: () => import('@/pages/ThreadMenu')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const uid = Store.dispatch('user/checkSignedIn')

  if (requiresAuth && !uid) next('/signin')

  next()
})

export default router