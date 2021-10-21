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
  {
    path: '/not_email_verified',
    name: 'NotEmailVerified',
    component: () => import('@/pages/NotEmailVerified')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  Store.dispatch('user/checkEmailVerified')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isEmailVerified = Store.getters['user/isEmailVerified']
  const isSignedIn = Store.getters['user/isSignedIn']
  if (requiresAuth) {
    if (isEmailVerified) next()
    else if (isSignedIn) next('/not_email_verified')
    else next('/signin')
  }
  else next()
})

export default router