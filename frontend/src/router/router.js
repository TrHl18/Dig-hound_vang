import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import IPCheck from '../components/Tools/IPCheck.vue'
import SignIn from '../components/SignIn.vue'

const routes = [
  { path: '/', name: 'Home', component: LandingPage },
  { path: '/ipcheck', name: 'IPCheck', component: IPCheck },
  { path: '/signin', name: 'SignIn', component: SignIn },
]

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

export default router