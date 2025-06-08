import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import IPCheck from '../components/Tools/IPCheck.vue'

const routes = [
  { path: '/', name: 'Home', component: LandingPage },
  { path: '/ipcheck', name: 'IPCheck', component: IPCheck }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router