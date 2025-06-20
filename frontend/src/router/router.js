import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import LandingPage from '../components/LandingPage.vue'
import IPCheck from '../components/Tools/IPCheck.vue'
import UrlScanner from '../components/Tools/UrlScanner.vue'

const routes = [
  { path: '/', redirect: '/signin' },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/landing', name: 'LandingPage', component: LandingPage },
  { path: '/ipcheck', name: 'IPCheck', component: IPCheck, meta: { requiresAuth: true } },
  { path: '/urlscanner', name: 'UrlScanner', component: UrlScanner, meta: { requiresAuth: true } },
]

// 2. Crea el router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

const publicPages = ['/signin']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (publicPages.includes(to.path)) {
    return next()
  }
  // Si la ruta requiere autenticación y NO hay token, redirige a /signin
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    return next('/signin')
  }
  // Si hay token o no requiere auth, permite acceso
  return next()
})

export default router