import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OrderView from '@/views/OrderView.vue'
import JoinView from '@/views/JoinView.vue'
import MeView from '@/views/MeView.vue'
import SearchView from '@/views/SearchView.vue'
import HospView from '@/views/HospView.vue'
import IWantView from '@/views/IWantView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CompView from '@/views/CompView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: { index: 1 },
      redirect: '/login'
    },
    {
      path: '/home',
      meta: { index: 1 },
      component: HomeView
    },
    {
      path: '/order',
      meta: { index: 1 },
      component: OrderView
    },
    {
      path: '/join',
      meta: { index: 1 },
      component: JoinView
    },
    {
      path: '/me',
      meta: { index: 1 },
      component: MeView
    },
    {
      path: '/search',
      meta: { index: 2 },

      component: SearchView
    },
    {
      path: '/hospital',
      meta: { index: 3 },

      component: HospView
    },
    {
      path: '/iwant',
      meta: { index: 1 },

      component: IWantView
    },
    {
      path: '/login',
      meta: { index: 1 },

      component: LoginView
    },
    {
      path: '/register',
      meta: { index: 1 },

      component: RegisterView
    },
    {
      path: '/company',
      meta: { index: 1 },

      component: CompView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 总是滚动到顶部
    return { top: 0 }
  }
})

export default router
