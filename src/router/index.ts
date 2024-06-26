import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OrderView from '@/views/OrderView.vue'
import JoinView from '@/views/JoinView.vue'
import MeView from '@/views/MeView.vue'
import SearchView from '@/views/SearchView.vue'
import HospView from '@/views/HospView.vue'
import IWantView from '@/views/IWantView.vue'
import LoginView from '@/views/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/order',
      component: OrderView
    },
    {
      path: '/join',
      component: JoinView
    },
    {
      path: '/me',
      component: MeView
    },
    {
      path: '/search',
      component: SearchView
    },
    {
      path: '/hospital',
      component: HospView
    },
    {
      path: '/iwant',
      component: IWantView
    },
    {
      path: '/login',
      component: LoginView
    }
  ]
})

export default router
