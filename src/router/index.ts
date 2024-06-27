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
import UserInfoView from '@/views/UserInfoView.vue'
import CommentView from '@/views/CommentView.vue'
import PatientView from '@/views/PatientView.vue'
import CommentDetailView from '@/views/CommentDetailView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
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
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/company',
      component: CompView
    },
    {
      path: '/userinfo',
      component: UserInfoView
    },
    {
      path: '/comment',
      component: CommentView
    },
    {
      path: '/patients',
      component: PatientView
    },
    {
      path: '/commentDetail',
      component: CommentDetailView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 总是滚动到顶部
    return { top: 0 }
  }
})

export default router
