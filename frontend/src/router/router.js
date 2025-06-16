import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import LandingPage from '../components/LandingPage.vue'
import IPCheck from '../components/Tools/IPCheck.vue'

// 1. Define tus rutas
const routes = [
  { path: '/', redirect: '/signin' },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/landing', name: 'LandingPage', component: LandingPage },
  { path: '/ipcheck', name: 'IPCheck', component: IPCheck, meta: { requiresAuth: true } },
]

// 2. Crea el router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Always scroll to the element, even if only the hash changes
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

// 3. Define rutas públicas explícitamente
const publicPages = ['/signin']

// 4. Guardia global de navegación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // Permite acceso libre a rutas públicas
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