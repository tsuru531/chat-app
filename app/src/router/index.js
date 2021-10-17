import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc } from 'firebase/firestore'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isSignedIn = Store.getters['user/isSignedIn']
  if (requiresAuth && !isSignedIn) {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const uid = user.uid
        const collectionRef = collection(db, 'users')
        const docRef = doc(collectionRef, uid)
        const docSnapshot = await getDoc(docRef)
        const data = docSnapshot.data()
        Store.commit('user/signIn', {
          uid,
          name: data.name
        })
        next()
      } else {
        next('/signin')
      }
    })
  }
  next()
})

export default router